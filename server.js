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

app.use(cors({
  origin: 'https://jelly-seller.vercel.app',
  credentials: true, // Allow credentials (e.g., cookies)
}));

app.post('/api/auth/login', (req, res) => {
  // Your login logic

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://jelly-seller.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Send response
  res.status(200).send('Login successful');
});


// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes); // Use data routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
