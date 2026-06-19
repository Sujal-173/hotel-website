const asyncHandler = require('express-async-handler');
const RoomBooking = require('../models/RoomBooking');
const Room = require('../models/Room');
const { sendBookingConfirmation, sendAdminNewBookingAlert } = require('../utils/emailService');
const socket = require('../utils/socket');

// @desc  Create room booking
// @route POST /api/bookings
const createBooking = asyncHandler(async (req, res) => {
  const { roomId, checkIn, checkOut, guestDetails, guests, addOns, specialRequests } = req.body;

  const room = await Room.findById(roomId);
  if (!room || !room.isActive) { res.status(404); throw new Error('Room not found'); }

  // Check availability
  const conflict = await RoomBooking.findOne({
    room: roomId,
    status: { $in: ['pending', 'confirmed', 'checked_in'] },
    $or: [{ checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }]
  });
  if (conflict) { res.status(400); throw new Error('Room not available for selected dates'); }

  // Pricing
  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  const roomPrice = (room.discountedPrice || room.price) * nights;
  const addOnsTotal = (addOns || []).reduce((sum, a) => sum + (a.price * (a.quantity || 1)), 0);
  const subtotal = roomPrice + addOnsTotal;
  const taxes = Math.round(subtotal * 0.12);
  const totalAmount = subtotal + taxes;
  const advancePaid = Math.round(totalAmount * 0.3);

  const booking = await RoomBooking.create({
    room: roomId,
    user: req.user?._id,
    guestDetails,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    guests,
    addOns: addOns || [],
    specialRequests,
    pricing: { roomPrice, addOnsTotal, taxes, totalAmount, advancePaid, balanceDue: totalAmount - advancePaid },
    source: 'website'
  });

  await booking.populate('room', 'name type images');

  // Real-time admin notification
  socket.emitToAdmin('new_booking', {
    bookingId: booking.bookingId,
    guestName: guestDetails?.name,
    room: room.name,
    amount: totalAmount,
    createdAt: booking.createdAt,
  });

  // Emails (non-blocking)
  sendBookingConfirmation(booking).catch(console.error);
  sendAdminNewBookingAlert(booking).catch(console.error);

  res.status(201).json({ success: true, booking, advanceToPay: advancePaid });
});

// @desc  Get user's bookings
// @route GET /api/bookings/my
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await RoomBooking.find({ user: req.user._id })
    .populate('room', 'name type images price')
    .sort({ createdAt: -1 });
  res.json({ success: true, bookings });
});

// @desc  Get single booking
// @route GET /api/bookings/:id
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await RoomBooking.findById(req.params.id).populate('room', 'name type images price');
  if (!booking) { res.status(404); throw new Error('Booking not found'); }
  res.json({ success: true, booking });
});

// @desc  Cancel booking
// @route PUT /api/bookings/:id/cancel
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await RoomBooking.findById(req.params.id);
  if (!booking) { res.status(404); throw new Error('Booking not found'); }
  if (booking.user?.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Not authorised'); }
  booking.status = 'cancelled';
  booking.cancellationReason = req.body.reason;
  await booking.save();
  res.json({ success: true, message: 'Booking cancelled', booking });
});

// ── ADMIN ──────────────────────────────────────────────────────────────────────

// @desc  Get all bookings (admin)
// @route GET /api/bookings/admin/all
const getAllBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 15, status, search } = req.query;
  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { bookingId: { $regex: search, $options: 'i' } },
      { 'guestDetails.name': { $regex: search, $options: 'i' } },
      { 'guestDetails.phone': { $regex: search, $options: 'i' } },
    ];
  }
  const total = await RoomBooking.countDocuments(query);
  const bookings = await RoomBooking.find(query)
    .populate('room', 'name type')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json({ success: true, bookings, total, page: Number(page), pages: Math.ceil(total / limit) });
});

// @desc  Update booking status (admin)
// @route PUT /api/bookings/admin/:id/status
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  const booking = await RoomBooking.findByIdAndUpdate(
    req.params.id,
    { status, ...(adminNotes && { adminNotes }) },
    { new: true }
  ).populate('room', 'name type');

  if (!booking) { res.status(404); throw new Error('Booking not found'); }

  socket.emitToAdmin('booking_updated', { bookingId: booking.bookingId, status });

  res.json({ success: true, booking });
});

module.exports = { createBooking, getMyBookings, getBooking: getBookingById, cancelBooking, getAllBookings, updateBookingStatus };
