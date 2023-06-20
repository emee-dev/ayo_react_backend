const mongoose = require('mongoose');
const User = require('./index');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  specialization: {
    type: String,
  },
  education: {
    type: String,
  },
  licenseNumber: {
    type: String,
  },
  location: {
    type: String,
  },
});

const Doctor = mongoose.model('doctor', doctorSchema);
module.exports = Doctor;
