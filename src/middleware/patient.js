const Patient = require('../model/patient');
const MedicalRecord = require('../model/medicalRecord');
const User = require('../model/index');

// get the latest medical record for patient
exports.getAllMedicalRecords = async (req, res) => {
  try {
    let patientId = req.body?.patientId;
    if (!patientId)
      return res
        .status(403)
        .send({ message: 'Patient id is required', data: [] });

    let records = await MedicalRecord.find({ patient_id: patientId })
      .populate('patient_id')
      .populate('doctor_id');

    if (!records)
      return res.status(403).send({ message: 'No record found', data: [] });

    res.send({
      message: 'All Medical Records retrieved',
      data: records,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};

// get all the appointments associated with this Patient
exports.getAllAppointments = async (req, res) => {
  try {
    let patientId = req.body?.patientId;

    if (!patientId)
      return res
        .status(403)
        .send({ message: 'Patient id is required', data: null });

    let patient = await Patient.findOne({ userId: patientId });
    if (!patient)
      return res.status(404).send({ message: 'Patient not found', data: null });

    res
      .status(200)
      .send({ message: 'Got all appointments', data: patient.appointments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};

// update patient profile
exports.updateProfile = async (req, res) => {
  try {
    let { patientId, firstname, lastname, phone, allegies } = req.body;

    await User.updateOne(
      { _id: patientId },
      {
        $set: {
          firstname,
          lastname,
          phone,
        },
      },
    );

    await Patient.updateOne(
      { userId: patientId },
      {
        $set: {
          allegies,
        },
      },
    );

    res.send({ message: 'Profile was updated', data: null });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};
