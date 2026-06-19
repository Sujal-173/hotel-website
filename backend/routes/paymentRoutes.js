// paymentRoutes.js
const express = require('express');
const r = express.Router();
const { createOrder, verifyPayment, paymentWebhook, getAllPayments } = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/auth');
r.post('/create-order', createOrder);
r.post('/verify', verifyPayment);
r.post('/webhook', paymentWebhook);
r.get('/admin/all', protect, admin, getAllPayments);
module.exports = r;
