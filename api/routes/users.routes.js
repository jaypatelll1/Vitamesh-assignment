const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findOne();

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, rewardPoints, completedDeliveries } = user;
    res.json({ name, email, rewardPoints, completedDeliveries });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
