const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletAddress: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['buyer', 'seller', 'certifier'], required: true },
});

module.exports = mongoose.model('User', userSchema);