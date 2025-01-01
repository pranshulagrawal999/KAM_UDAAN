const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  status: { type: String, enum: ['New', 'Active', 'Inactive'], default: 'New' },
  assignedKAM: { type: String, required: true },
  callFrequency: { type: Number, default: 7 },
  lastCallDate: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
