const mongoose = require('mongoose');

const eventBookingSchema = new mongoose.Schema({
  bookingId:    { type: String, unique: true },
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  package:      { type: mongoose.Schema.Types.ObjectId, ref: 'EventPackage' },
  eventType: {
    type: String,
    enum: ['wedding', 'reception', 'engagement', 'birthday', 'anniversary', 'corporate', 'family', 'cultural'],
    required: true
  },
  contactDetails: {
    name:    { type: String, required: true },
    email:   { type: String, required: true },
    phone:   { type: String, required: true },
    altPhone:String,
    address: String,
  },
  eventDetails: {
    eventDate:   { type: Date, required: true },
    eventDate2:  Date,
    guestCount:  { type: Number, required: true },
    venue:       String,
    timeSlot:    String,
    decorTheme:  String,
    cateringRequired:  { type: Boolean, default: true },
    roomsRequired:     { type: Number, default: 0 },
    specialRequirements: String,
  },
  selectedAddOns: [{
    name: String, price: Number, quantity: { type: Number, default: 1 }
  }],
  pricing: {
    packagePrice:    Number,
    addOnsTotal:     { type: Number, default: 0 },
    cateringTotal:   { type: Number, default: 0 },
    roomsTotal:      { type: Number, default: 0 },
    taxes:           { type: Number, default: 0 },
    discount:        { type: Number, default: 0 },
    totalEstimate:   Number,
    advancePaid:     { type: Number, default: 0 },
    tokenAmount:     { type: Number, default: 10000 },
    balanceDue:      Number,
    isCustomQuote:   { type: Boolean, default: false },
  },
  status: {
    type: String,
    enum: ['inquiry', 'quote_sent', 'confirmed', 'advance_paid', 'completed', 'cancelled'],
    default: 'inquiry'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'token_paid', 'partial', 'paid', 'refunded'],
    default: 'unpaid'
  },
  paymentId:       String,
  razorpayOrderId: String,
  adminNotes:      String,
  confirmedAt:     Date,
  cancelledAt:     Date,
  cancellationReason: String,
  followUpDate:    Date,
  assignedTo:      String,
}, { timestamps: true });

eventBookingSchema.pre('save', async function (next) {
  if (!this.bookingId) {
    const count = await mongoose.model('EventBooking').countDocuments();
    this.bookingId = `YPE${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('EventBooking', eventBookingSchema);
