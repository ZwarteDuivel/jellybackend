// routes/data.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Define the route to fetch user data
router.get('/', async (req, res) => {
    try {
      // Your logic to fetch user data from the database goes here
      // For example:
      const userData = await User.find(); // Fetch all users
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
