const express = require('express');
const misc = require('../controllers/miscControllers');
const { protect, admin } = require('../middleware/auth');

// Review routes
const reviewRouter = express.Router();
reviewRouter.get('/', misc.getReviews);
reviewRouter.post('/', misc.createReview);
reviewRouter.get('/admin/all', protect, admin, misc.getAllReviewsAdmin);
reviewRouter.put('/admin/:id', protect, admin, misc.updateReview);

// Gallery routes
const galleryRouter = express.Router();
galleryRouter.get('/', misc.getGallery);
galleryRouter.post('/', protect, admin, misc.addGalleryImage);
galleryRouter.put('/:id', protect, admin, misc.updateGalleryImage);
galleryRouter.delete('/:id', protect, admin, misc.deleteGalleryImage);

// Inquiry routes
const inquiryRouter = express.Router();
inquiryRouter.post('/', misc.createInquiry);
inquiryRouter.get('/admin/all', protect, admin, misc.getAllInquiries);
inquiryRouter.put('/admin/:id', protect, admin, misc.updateInquiry);

// Offer routes
const offerRouter = express.Router();
offerRouter.get('/', misc.getOffers);
offerRouter.post('/validate', misc.validateOffer);
offerRouter.post('/admin', protect, admin, misc.createOffer);
offerRouter.put('/admin/:id', protect, admin, misc.updateOffer);

// Admin dashboard route
const adminRouter = express.Router();
adminRouter.get('/dashboard', protect, admin, misc.getDashboardStats);

module.exports = { reviewRouter, galleryRouter, inquiryRouter, offerRouter, adminRouter };
