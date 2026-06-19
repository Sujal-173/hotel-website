const asyncHandler = require('express-async-handler');
const { Review, Gallery, Inquiry, Offer } = require('../models/index');
const { sendAdminNewInquiryAlert } = require('../utils/emailService');
const socket = require('../utils/socket');

// ─── REVIEWS ────────────────────────────────────────────────────────────────

const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json({ success: true, review, message: 'Review submitted. Will appear after moderation.' });
});

const getReviews = asyncHandler(async (req, res) => {
  const { featured } = req.query;
  const query = { isActive: true, isApproved: true };
  if (featured === 'true') query.isFeatured = true;
  const reviews = await Review.find(query).sort({ createdAt: -1 }).limit(20);
  res.json({ success: true, reviews });
});

const getAllReviewsAdmin = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json({ success: true, reviews });
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!review) { res.status(404); throw new Error('Review not found'); }
  res.json({ success: true, review });
});

// ─── GALLERY ────────────────────────────────────────────────────────────────

const getGallery = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = { isActive: true };
  if (category) query.category = category;
  const images = await Gallery.find(query).sort({ sortOrder: 1 });
  res.json({ success: true, images });
});

const addGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.create({ ...req.body, uploadedBy: req.user._id });
  res.status(201).json({ success: true, image });
});

const updateGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, image });
});

const deleteGalleryImage = asyncHandler(async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Image deleted' });
});

// ─── INQUIRIES ───────────────────────────────────────────────────────────────

const createInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.create(req.body);

  // Real-time admin notification
  socket.emitToAdmin('new_inquiry', {
    name: inquiry.name,
    phone: inquiry.phone,
    inquiryType: inquiry.inquiryType,
    createdAt: inquiry.createdAt,
  });

  // Admin email alert (non-blocking)
  sendAdminNewInquiryAlert(inquiry).catch(console.error);

  res.status(201).json({ success: true, inquiry, message: 'Thank you! We will contact you shortly.' });
});

const getAllInquiries = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const query = status ? { status } : {};
  const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: inquiries.length, inquiries });
});

const updateInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, inquiry });
});

// ─── OFFERS ──────────────────────────────────────────────────────────────────

const getOffers = asyncHandler(async (req, res) => {
  const now = new Date();
  const offers = await Offer.find({ isActive: true, $or: [{ endDate: null }, { endDate: { $gte: now } }] });
  res.json({ success: true, offers });
});

const validateOffer = asyncHandler(async (req, res) => {
  const { code, amount, type } = req.body;
  const offer = await Offer.findOne({ code: code.toUpperCase(), isActive: true });
  if (!offer) { res.status(404); throw new Error('Invalid or expired promo code'); }
  if (offer.endDate && offer.endDate < new Date()) { res.status(400); throw new Error('Promo code has expired'); }
  if (offer.usageLimit && offer.usedCount >= offer.usageLimit) { res.status(400); throw new Error('Promo code usage limit reached'); }
  if (offer.minAmount && amount < offer.minAmount) { res.status(400); throw new Error(`Minimum booking amount ₹${offer.minAmount} required`); }
  if (offer.applicableTo !== 'both' && offer.applicableTo !== type) { res.status(400); throw new Error(`This offer is not valid for ${type} bookings`); }

  let discount = 0;
  if (offer.type === 'percentage') discount = Math.min((amount * offer.value) / 100, offer.maxDiscount || Infinity);
  else if (offer.type === 'fixed') discount = offer.value;

  res.json({ success: true, discount: Math.round(discount), offer: { name: offer.title, type: offer.type, value: offer.value } });
});

const createOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(201).json({ success: true, offer });
});

const updateOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, offer });
});

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
const RoomBooking = require('../models/RoomBooking');
const EventBooking = require('../models/EventBooking');
const { Payment } = require('../models/index');
const User = require('../models/User');

const getDashboardStats = asyncHandler(async (req, res) => {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalRoomBookings, confirmedRoomBookings, pendingRoomBookings,
    totalEventBookings, confirmedEventBookings, pendingInquiries,
    totalRevenue, monthlyRevenue, totalUsers, totalReviews, unreviewedCount
  ] = await Promise.all([
    RoomBooking.countDocuments(),
    RoomBooking.countDocuments({ status: 'confirmed' }),
    RoomBooking.countDocuments({ status: 'pending' }),
    EventBooking.countDocuments(),
    EventBooking.countDocuments({ status: { $in: ['confirmed', 'advance_paid'] } }),
    Inquiry.countDocuments({ status: 'new' }),
    Payment.aggregate([{ $match: { status: 'captured' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    Payment.aggregate([{ $match: { status: 'captured', createdAt: { $gte: thisMonthStart } } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    User.countDocuments({ role: 'user' }),
    Review.countDocuments(),
    Review.countDocuments({ isApproved: false })
  ]);

  const recentBookings = await RoomBooking.find()
    .populate('room', 'name type')
    .sort({ createdAt: -1 })
    .limit(5)
    .select('bookingId guestDetails.name checkIn checkOut status pricing.totalAmount');

  const recentEvents = await EventBooking.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('bookingId contactDetails.name eventType eventDetails.eventDate status pricing.totalEstimate');

  res.json({
    success: true,
    stats: {
      roomBookings: { total: totalRoomBookings, confirmed: confirmedRoomBookings, pending: pendingRoomBookings },
      eventBookings: { total: totalEventBookings, confirmed: confirmedEventBookings },
      inquiries: { pending: pendingInquiries },
      revenue: {
        total: totalRevenue[0]?.total || 0,
        thisMonth: monthlyRevenue[0]?.total || 0
      },
      users: totalUsers,
      reviews: { total: totalReviews, pending: unreviewedCount }
    },
    recentBookings,
    recentEvents
  });
});

module.exports = {
  createReview, getReviews, getAllReviewsAdmin, updateReview,
  getGallery, addGalleryImage, updateGalleryImage, deleteGalleryImage,
  createInquiry, getAllInquiries, updateInquiry,
  getOffers, validateOffer, createOffer, updateOffer,
  getDashboardStats
};
