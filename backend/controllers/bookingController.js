const asyncHandler = require('express-async-handler');
const RoomBooking = require('../models/RoomBooking');
const Room = require('../models/Room');
const { sendBookingConfirmation } = require('../utils/emailService');

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

  // Send confirmation email (non-blocking)
  sendBookingConfirmation(booking).catch(console.error);

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
const getBooking = asyncHandler(async (req, res) => {
  const booking = await RoomBooking.findOne({
    $or: [{ _id: req.params.id }, { bookingId: req.params.id }]
  }).populate('room', 'name type images price policies');
  if (!booking) { res.status(404); throw new Error('Booking not found'); }
  res.json({ success: true, booking });
});

// @desc  Cancel booking
// @route PUT /api/bookings/:id/cancel
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await RoomBooking.findOne({ bookingId: req.params.id });
  if (!booking) { res.status(404); throw new Error('Booking not found'); }
  if (['cancelled', 'checked_out'].includes(booking.status)) {
    res.status(400); throw new Error('Booking cannot be cancelled');
  }
  booking.status = 'cancelled';
  booking.cancellationReason = req.body.reason || 'Cancelled by guest';
  booking.cancelledAt = new Date();
  await booking.save();
  res.json({ success: true, message: 'Booking cancelled successfully', booking });
});

// @desc  Admin - Get all bookings
// @route GET /api/bookings/admin/all
const getAllBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20, search } = req.query;
  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { bookingId: { $regex: search, $options: 'i' } },
      { 'guestDetails.name': { $regex: search, $options: 'i' } },
      { 'guestDetails.phone': { $regex: search, $options: 'i' } }
    ];
  }
  const total = await RoomBooking.countDocuments(query);
  const bookings = await RoomBooking.find(query)
    .populate('room', 'name type')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json({ success: true, total, page: parseInt(page), pages: Math.ceil(total / limit), bookings });
});

// @desc  Admin - Update booking status
// @route PUT /api/bookings/admin/:id/status
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;
  const booking = await RoomBooking.findByIdAndUpdate(
    req.params.id,
    { status, notes, ...(status === 'confirmed' && { confirmedAt: new Date() }) },
    { new: true }
  ).populate('room', 'name type');
  if (!booking) { res.status(404); throw new Error('Booking not found'); }
  res.json({ success: true, booking });
});

module.exports = { createBooking, getMyBookings, getBooking, cancelBooking, getAllBookings, updateBookingStatus };
