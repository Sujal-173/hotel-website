const asyncHandler = require('express-async-handler');
const EventBooking = require('../models/EventBooking');
const EventPackage = require('../models/EventPackage');
const { sendEventInquiryConfirmation, sendAdminNewEventAlert } = require('../utils/emailService');
const socket = require('../utils/socket');

// @desc  Create event booking / inquiry
// @route POST /api/events/book
const createEventBooking = asyncHandler(async (req, res) => {
  const { packageId, eventType, contactDetails, eventDetails, selectedAddOns } = req.body;

  let packageData = null;
  let packagePrice = 0;
  if (packageId) {
    packageData = await EventPackage.findById(packageId);
    if (!packageData) { res.status(404); throw new Error('Package not found'); }
    packagePrice = packageData.price;
  }

  const addOnsTotal = (selectedAddOns || []).reduce((s, a) => s + (a.price * (a.quantity || 1)), 0);
  const subtotal = packagePrice + addOnsTotal;
  const taxes = Math.round(subtotal * 0.12);
  const totalEstimate = subtotal + taxes;

  const booking = await EventBooking.create({
    package: packageId || undefined,
    eventType,
    contactDetails,
    eventDetails,
    selectedAddOns: selectedAddOns || [],
    user: req.user?._id,
    pricing: {
      packagePrice,
      addOnsTotal,
      taxes,
      totalEstimate,
      tokenAmount: 10000,
      balanceDue: totalEstimate - 10000,
      isCustomQuote: !packageId,
    },
    status: 'inquiry'
  });

  await booking.populate('package', 'name category capacity');

  // Real-time admin notification
  socket.emitToAdmin('new_event', {
    bookingId: booking.bookingId,
    guestName: contactDetails?.name,
    eventType,
    eventDate: eventDetails?.eventDate,
    guestCount: eventDetails?.guestCount,
    createdAt: booking.createdAt,
  });

  // Emails (non-blocking)
  sendEventInquiryConfirmation(booking).catch(console.error);
  sendAdminNewEventAlert(booking).catch(console.error);

  res.status(201).json({ success: true, booking, message: 'Inquiry received. Our team will contact you within 2 hours.' });
});

// @desc  Check event date availability
// @route POST /api/events/check-date
const checkEventDate = asyncHandler(async (req, res) => {
  const { date, venue } = req.body;
  const eventDate = new Date(date);
  const dateStart = new Date(eventDate); dateStart.setHours(0,0,0,0);
  const dateEnd   = new Date(eventDate); dateEnd.setHours(23,59,59,999);

  const existing = await EventBooking.find({
    'eventDetails.eventDate': { $gte: dateStart, $lte: dateEnd },
    status: { $in: ['confirmed', 'advance_paid'] }
  }).select('eventDetails.venue eventDetails.guestCount status');

  const available = existing.length === 0;
  res.json({ success: true, available, existingEvents: existing.length, message: available ? 'Date is available!' : 'Date already booked. Please choose another date.' });
});

// @desc  Get event packages
// @route GET /api/events/packages
const getEventPackages = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = { isActive: true };
  if (category) query.category = category;
  const packages = await EventPackage.find(query).sort({ sortOrder: 1 });
  res.json({ success: true, packages });
});

// @desc  Admin - Get all event bookings
// @route GET /api/events/admin/all
const getAllEventBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20, search } = req.query;
  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { bookingId: { $regex: search, $options: 'i' } },
      { 'contactDetails.name': { $regex: search, $options: 'i' } },
      { 'contactDetails.phone': { $regex: search, $options: 'i' } }
    ];
  }
  const total = await EventBooking.countDocuments(query);
  const bookings = await EventBooking.find(query)
    .populate('package', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json({ success: true, total, pages: Math.ceil(total / limit), bookings });
});

// @desc  Admin - Update event booking status
// @route PUT /api/events/admin/:id/status
const updateEventStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes, totalEstimate, followUpDate } = req.body;
  const booking = await EventBooking.findByIdAndUpdate(
    req.params.id,
    {
      status, adminNotes,
      ...(totalEstimate && { 'pricing.totalEstimate': totalEstimate }),
      ...(followUpDate && { followUpDate }),
      ...(status === 'confirmed' && { confirmedAt: new Date() })
    },
    { new: true }
  ).populate('package', 'name');
  if (!booking) { res.status(404); throw new Error('Event booking not found'); }

  socket.emitToAdmin('event_updated', { bookingId: booking.bookingId, status });

  res.json({ success: true, booking });
});

module.exports = { createEventBooking, checkEventDate, getEventPackages, getAllEventBookings, updateEventStatus };
