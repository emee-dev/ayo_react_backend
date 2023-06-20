const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ['PATIENT', 'DOCTOR'], // SECRETARY is the Admin
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
