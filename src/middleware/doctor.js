const Patient = require('../model/patient');
const MedicalRecord = require('../model/medicalRecord');
const Doctor = require('../model/doctor');
const User = require('../model/index');

// This is for the doctor scheduling appointments
exports.createAppointment = async (req, res) => {
  try {
    let { patientId, doctorId, date } = req.body;

    if (!patientId && !doctorId)
      return res
        .status(402)
        .send({ message: 'Doctor & Patient user id is required', data: [] });

    let PatientName = await User.findOne({ _id: patientId });
    let DoctorName = await User.findOne({ _id: doctorId });

    const appointment = await Patient.updateOne(
      { userId: patientId },
      {
        $push: {
          appointments: {
            patient_id: patientId,
            patient_name: PatientName.firstname,
            doctor_id: doctorId,
            doctor_name: DoctorName.firstname,
            date,
          },
        },
      },
    );

    res.send({
      message: 'Appointment created Successfully',
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};

// get all the appointments associated with this Patient and Doctor
exports.getAllAppointments = async (req, res) => {
  try {
    let doctorId = req.body?.doctorId;

    if (!doctorId)
      return res
        .status(402)
        .send({ message: 'Doctor user id is required', data: [] });

    // TODO fix this query it is not returning documents where the id is matched
    // TODO I have fixed it remember to also fix the code similar to this one
    let appointments = await Patient.find(
      { 'appointments.doctor_id': doctorId },
      {
        'appointments.$': 1,
      },
    ).exec();

    res.send({ message: 'Got all appointments', data: appointments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    let { eventId } = req.body;
    if (!eventId)
      return res
        .status(402)
        .send({ message: 'Event id is required', data: [] });

    let deleteEvent = await Patient.updateOne(
      { 'appointments._id': eventId },
      { $pull: { appointments: { _id: eventId } } },
    );

    res.send({
      message: 'Appointment deleted Successfully',
      data: deleteEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};

// create a medical record for patient
exports.createMedicalRecord = async (req, res) => {
  try {
    let {
      patient_id,
      doctor_id,
      medication_name,
      rpt,
      dosageInstructions,
      quantity,
      days_to_take,
      treatment,
      diagnosis,
    } = req.body;

    if (!patient_id && !doctor_id)
      return res
        .status(402)
        .send({ message: 'Doctor & Patient user id is required', data: [] });

    let record = new MedicalRecord({
      patient_id,
      doctor_id,
      prescriptions: [
        {
          medication_name,
          rpt,
          dosageInstructions,
          quantity,
          days_to_take,
          treatment,
          diagnosis,
        },
      ],
    });

    if (!record)
      return res
        .status(500)
        .send({ message: 'Could not create medical record', data: [] });

    await record.save();

    res.send({ message: 'Medical record was created', data: [] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};

// update doctor profile
exports.updateProfile = async (req, res) => {
  try {
    let {
      doctorId,
      firstname,
      lastname,
      specialization,
      education,
      licenseNumber,
      location,
      phone,
    } = req.body;

    if (!doctorId)
      return res
        .status(402)
        .send({ message: 'Doctor user id is required', data: [] });

    await User.updateOne(
      { _id: doctorId },
      {
        $set: {
          firstname,
          lastname,
          phone,
        },
      },
    );

    await Doctor.updateOne(
      { userId: doctorId },
      {
        $set: {
          specialization,
          education,
          licenseNumber,
          location,
        },
      },
    );

    res.send({ message: 'Profile was updated', data: [] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};

// Get all patients records
exports.getAllPatients = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const filter = req.query.filter || null;

    const skip = (page - 1) * limit;

    const pageCount = Math.ceil(
      (await Patient.estimatedDocumentCount()) / limit,
    );

    if (filter) {
      const patient = await Patient.findOne({ userId: filter }).populate(
        'userId',
      );

      if (!patient)
        return res.status(400).send({
          message: 'Patient not found',
          data: [],
        });

      res.status(200).send({
        message: 'Got a patient',
        data: patient,
        pageCount: pageCount,
      });
    } else {
      const patients = await Patient.find()
        .populate('userId')
        .skip(skip)
        .limit(limit);

      if (!patients)
        return res.status(400).send({
          message: 'Patients not found',
          data: [],
        });

      res.status(200).send({
        message: 'Got all patients',
        data: patients,
        pageCount: pageCount,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};

// Get a single patient from search
exports.GetOnePatient = async (req, res) => {
  try {
    const { userId } = req.body;

    const patient = await Patient.findOne({ userId: userId }).populate(
      'userId',
    );

    if (!patient)
      return res.status(400).send({ message: 'Patient not found', data: [] });

    res.status(200).send({ message: 'Got a patient', data: patient });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};

// get a prescription array from medical record
exports.patientPrescriptions = async (req, res) => {
  try {
    let patientId = req.body.patientId;

    if (!patientId)
      return res
        .status(403)
        .send({ message: 'Patient user id is required', data: [] });

    let patient = await MedicalRecord.findOne({
      patient_id: patientId,
    });

    if (!patient)
      return res
        .status(401)
        .send({ message: 'Patient user was not found', data: [] });

    res.send({
      message: 'Got Patient Prescriptions',
      data: patient?.prescriptions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error', data: null });
  }
};
