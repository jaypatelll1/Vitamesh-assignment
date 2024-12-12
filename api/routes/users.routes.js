const express = require('express');
const Request = require('../models/Request.model');
const User = require('../models/User.model');
const router = express.Router();

// Get All Requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().populate('createdBy', 'name');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create New Request
router.post('/', async (req, res) => {
  const { item, pickupAddress, dropoffAddress, rewardPoints, userId } = req.body;

  try {
    const newRequest = new Request({
      item,
      pickupAddress,
      dropoffAddress,
      rewardPoints,
      createdBy: userId,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
