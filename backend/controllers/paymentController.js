const Razorpay = require('razorpay');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const RoomBooking = require('../models/RoomBooking');
const EventBooking = require('../models/EventBooking');
const { Payment } = require('../models/index');

let _razorpay = null;
function getRazorpay() {
  if (!_razorpay) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay keys not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
    }
    _razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return _razorpay;
}

// @desc  Create Razorpay order
// @route POST /api/payments/create-order
const createOrder = asyncHandler(async (req, res) => {
  const { amount, bookingId, bookingType, currency = 'INR' } = req.body;
  if (!amount || !bookingId || !bookingType) {
    res.status(400); throw new Error('Amount, bookingId and bookingType are required');
  }

  const options = {
    amount: Math.round(amount * 100), // Razorpay expects paise
    currency,
    receipt: `rcpt_${bookingId}`,
    notes: { bookingId, bookingType, hotelName: 'Yashraj Palace' }
  };

  const order = await getRazorpay().orders.create(options);

  // Store payment record
  await Payment.create({
    paymentId: `PAY${Date.now()}`,
    razorpayOrderId: order.id,
    bookingRef: bookingId,
    bookingType,
    amount,
    status: 'created',
    user: req.user?._id,
    notes: options.notes
  });

  res.json({
    success: true,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    key: process.env.RAZORPAY_KEY_ID
  });
});

// @desc  Verify Razorpay payment
// @route POST /api/payments/verify
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, bookingType } = req.body;

  // Verify signature
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    res.status(400); throw new Error('Payment verification failed - invalid signature');
  }

  // Update payment record
  await Payment.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    { razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: 'captured' }
  );

  // Update booking payment status
  if (bookingType === 'room') {
    await RoomBooking.findOneAndUpdate(
      { bookingId },
      { paymentStatus: 'partial', paymentId: razorpay_payment_id, razorpayOrderId: razorpay_order_id, status: 'confirmed', confirmedAt: new Date() }
    );
  } else if (bookingType === 'event') {
    await EventBooking.findOneAndUpdate(
      { bookingId },
      { paymentStatus: 'token_paid', paymentId: razorpay_payment_id, razorpayOrderId: razorpay_order_id, status: 'advance_paid', confirmedAt: new Date() }
    );
  }

  res.json({ success: true, message: 'Payment verified and booking confirmed!', paymentId: razorpay_payment_id });
});

// @desc  Payment webhook (Razorpay)
// @route POST /api/payments/webhook
const paymentWebhook = asyncHandler(async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];

  if (webhookSecret) {
    const expectedSig = crypto.createHmac('sha256', webhookSecret).update(JSON.stringify(req.body)).digest('hex');
    if (expectedSig !== signature) {
      return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
    }
  }

  const { event, payload } = req.body;
  if (event === 'payment.captured') {
    await Payment.findOneAndUpdate(
      { razorpayOrderId: payload.payment.entity.order_id },
      { status: 'captured', method: payload.payment.entity.method }
    );
  }

  res.json({ success: true });
});

// @desc  Get payment history (Admin)
// @route GET /api/payments/admin/all
const getAllPayments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const total = await Payment.countDocuments();
  const payments = await Payment.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json({ success: true, total, pages: Math.ceil(total / limit), payments });
});

module.exports = { createOrder, verifyPayment, paymentWebhook, getAllPayments };
