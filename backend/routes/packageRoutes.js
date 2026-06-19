const express = require('express');
const router = express.Router();
const { getEventPackages } = require('../controllers/eventController');
const EventPackage = require('../models/EventPackage');
const { protect, admin } = require('../middleware/auth');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

router.get('/', getEventPackages);
router.get('/:slug', asyncHandler(async (req, res) => {
  const pkg = await EventPackage.findOne({ slug: req.params.slug, isActive: true });
  if (!pkg) { res.status(404); throw new Error('Package not found'); }
  res.json({ success: true, package: pkg });
}));
router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const { name, ...rest } = req.body;
  const pkg = await EventPackage.create({ name, slug: slugify(name, { lower: true, strict: true }), ...rest });
  res.status(201).json({ success: true, package: pkg });
}));
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const pkg = await EventPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, package: pkg });
}));
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  await EventPackage.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ success: true, message: 'Package deactivated' });
}));
module.exports = router;
