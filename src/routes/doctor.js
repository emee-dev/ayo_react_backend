const express = require('express');
const router = express.Router();

const { is_required } = require('../helper/index');

const {
  createAppointment,
  getAllAppointments,
  createMedicalRecord,
  updateProfile,
  getAllPatients,
  GetOnePatient,
  patientPrescriptions,
  deleteAppointment,
} = require('../middleware/doctor');

router.get('/patients', getAllPatients);
router.post('/patients', GetOnePatient);

router.post('/appointments', getAllAppointments);
router.post('/appointments/create', createAppointment);
router.delete('/appointments', deleteAppointment);

router.post('/prescriptions', patientPrescriptions);
router.post('/record', createMedicalRecord);
router.post('/profile', updateProfile);

module.exports = router;
