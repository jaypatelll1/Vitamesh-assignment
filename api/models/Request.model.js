const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  item: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  dropoffAddress: { type: String, required: true },
  rewardPoints: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Request', RequestSchema);
