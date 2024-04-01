const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const Cookies = require('cookies');

router.post('/login', async (req, res) => {
  try {
    const { uid } = req.body;
    
    // Find user by UID in the database
    const user = await User.findOne({ uid });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid UID' });
    }

    // Set cookie upon successful login
    const cookies = new Cookies(req, res);
    cookies.set('isLoggedIn', 'true', { httpOnly: true });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/register', async (req, res) => {
    try {
      const { name, email, phone, signature, uid } = req.body;
  
      // Check if the user with the provided UID already exists
      const existingUser = await User.findOne({ uid });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this UID already exists' });
      }
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        phone,
        signature,
        uid
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
