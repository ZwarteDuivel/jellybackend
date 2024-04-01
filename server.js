// server.js
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://firebrowserdevs:DbBqcROsPcek45uY@jellyagree.lfnzh5v.mongodb.net/SellerAgreement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'https://jelly-seller.vercel.app/', // Allow requests from this origin
  credentials: true, // Allow credentials (e.g., cookies)
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes); // Use data routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
