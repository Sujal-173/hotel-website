// bookingRoutes.js
const express = require('express');
const r1 = express.Router();
const { createBooking, getMyBookings, getBooking, cancelBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');
r1.post('/', createBooking);
r1.get('/my', protect, getMyBookings);
r1.get('/admin/all', protect, admin, getAllBookings);
r1.get('/:id', getBooking);
r1.put('/:id/cancel', cancelBooking);
r1.put('/admin/:id/status', protect, admin, updateBookingStatus);
module.exports = r1;
