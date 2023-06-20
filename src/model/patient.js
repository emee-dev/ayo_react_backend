const mongoose = require('mongoose');
// const user = require("./index")

const appointmentSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  patient_name: {
    type: String,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  doctor_name: {
    type: String,
  },
  date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  allegies: {
    type: String,
  },
  appointments: [appointmentSchema],
});

const Patient = mongoose.model('patient', patientSchema);
module.exports = Patient;
