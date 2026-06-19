const express = require('express');
const router = express.Router();
const { getRooms, getRoom, checkAvailability, createRoom, updateRoom, deleteRoom, getUnavailableDates } = require('../controllers/roomController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getRooms);
router.post('/check-availability', checkAvailability);
router.get('/:slug', getRoom);
router.get('/:id/unavailable-dates', getUnavailableDates);
router.post('/', protect, admin, createRoom);
router.put('/:id', protect, admin, updateRoom);
router.delete('/:id', protect, admin, deleteRoom);

module.exports = router;
