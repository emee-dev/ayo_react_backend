const express = require('express');
const router = express.Router();

const { is_required } = require('../helper/index');

const {
  createAppointment,
  getAllAppointments,
  createMedicalRecord,
  updateProfile,
  getAllPatients,
  patientPrescriptions,
  deleteAppointment,
} = require('../middleware/doctor');

router.get('/patients', getAllPatients);
router.post('/appointments', getAllAppointments);
router.post('/prescriptions', patientPrescriptions);
router.post('/appointments/create', createAppointment);
router.post('/record', createMedicalRecord);
router.post('/profile', updateProfile);
router.delete('/appointments', deleteAppointment);

module.exports = router;
