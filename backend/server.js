const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const socketUtil = require('./utils/socket');

const app = express();
const server = http.createServer(app);

// Allowed origins: env var + localhost fallbacks
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5000',
  'http://localhost:3000',
].filter(Boolean);

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o))) return cb(null, true);
    if (origin.includes('.replit.dev') || origin.includes('.repl.co')) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

// Socket.IO
const io = new Server(server, { cors: corsOptions });
socketUtil.init(io);

io.on('connection', (socket) => {
  socket.on('join_admin', () => socket.join('admin_room'));
  socket.on('leave_admin', () => socket.leave('admin_room'));
});

// Trust proxy — must come FIRST for Replit/reverse-proxy + rate-limiter
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// CORS + body parsing
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/rooms',      require('./routes/roomRoutes'));
app.use('/api/bookings',   require('./routes/bookingRoutes'));
app.use('/api/events',     require('./routes/eventRoutes'));
app.use('/api/packages',   require('./routes/packageRoutes'));
app.use('/api/payments',   require('./routes/paymentRoutes'));
app.use('/api/reviews',    require('./routes/reviewRoutes'));
app.use('/api/gallery',    require('./routes/galleryRoutes'));
app.use('/api/inquiries',  require('./routes/inquiryRoutes'));
app.use('/api/admin',      require('./routes/adminRoutes'));
app.use('/api/offers',     require('./routes/offerRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Yashraj Palace API running', ts: Date.now() }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// MongoDB connection + server start
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    server.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = { app, io };
