const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    req.userId = decoded.id;
    next();
  });
};

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, rewardPoints, completedDeliveries } = user;
    res.json({ name, email, rewardPoints, completedDeliveries });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
