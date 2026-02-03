require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
// In Vercel, we should handle DB connection differently
let dbConnected = false;

async function connectDB() {
  if (!dbConnected) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
      dbConnected = true;
    } catch (err) {
      console.error('MongoDB connection error:', err);
      throw err;
    }
  }
}

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Import routes
app.use('/api/auth', require('../routes/auth'));
app.use('/api/products', require('../routes/products'));
app.use('/api/cart', require('../routes/cart'));
app.use('/api/orders', require('../routes/orders'));
app.use('/api/seller', require('../routes/seller'));
app.use('/api/admin', require('../routes/admin'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export app for Vercel
module.exports = app;

// Only start server if running directly (not in Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
