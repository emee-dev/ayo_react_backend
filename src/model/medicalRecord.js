const mongoose = require('mongoose');
const user = require('./index');

// medication_name: Propanol 20mg Tab
// rpt["times to repeat"]: 3 ie the number of sachets given to patient
// dispense date: 12 Jan 2023 [Date type]
// quantity: 35 Tab(s) [number type]
// days_to_take: 30 Day(s) [number type]

const prescriptionSchema = new mongoose.Schema({
  medication_name: {
    type: String,
  },
  rpt: {
    type: Number,
  },
  dosageInstructions: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  days_to_take: {
    type: String,
  },
  treatment: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  dispense_date: {
    type: Date,
    default: Date.now(),
  },
});

const medicalRecordSchema = new mongoose.Schema({
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
  prescriptions: [prescriptionSchema],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const MedicalRecord = mongoose.model('medicalrecord', medicalRecordSchema);
module.exports = MedicalRecord;
