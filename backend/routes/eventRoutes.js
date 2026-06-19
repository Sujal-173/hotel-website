const express = require('express');
const router = express.Router();
const { createEventBooking, checkEventDate, getAllEventBookings, updateEventStatus } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');
router.post('/book', createEventBooking);
router.post('/check-date', checkEventDate);
router.get('/admin/all', protect, admin, getAllEventBookings);
router.put('/admin/:id/status', protect, admin, updateEventStatus);
module.exports = router;
