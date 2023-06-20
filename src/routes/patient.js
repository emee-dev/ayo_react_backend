const express = require('express');
const router = express.Router();

const { is_required } = require('../helper/index');

const {
  getAllMedicalRecords,
  getAllAppointments,
  updateProfile,
} = require('../middleware/patient');

//Patient
router.post('/records', getAllMedicalRecords);
router.post('/appointments', getAllAppointments);
router.post('/profile', updateProfile);

module.exports = router;
