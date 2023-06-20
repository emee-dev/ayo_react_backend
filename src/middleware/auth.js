const User = require('../model/index');
const Patient = require('../model/patient');
const Doctor = require('../model/doctor');
const { hashpassword, comparePassword } = require('../helper/index');
const jwt = require('jsonwebtoken');

// Route for registration
exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      firstname,
      lastname,
      gender,
      phone,
      role,
    } = req.body;

    console.log(req.body);

    // const exist = await User.findOne({ email });
    // if (exist)
    //   return res
    //     .status(400)
    //     .send({ message: 'User exists, login to continue' });

    // let hashPassword = await hashpassword(password);

    // let newUser = new User({
    //   email: email.toLowerCase(),
    //   password: hashPassword,
    //   firstname,
    //   lastname,
    //   gender,
    //   phone,
    //   role: role.toUpperCase(),
    // });

    // await newUser.save();

    // if (role === 'patient') {
    //   let newPatient = new Patient({
    //     userId: newUser._id,
    //   });
    //   await newPatient.save();
    // }

    // if (role === 'doctor') {
    //   let newDoctor = new Doctor({
    //     userId: newUser._id,
    //   });

    //   await newDoctor.save();
    // }

    res.status(200).send({ message: 'Registration Successful' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Route for Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });

    if (!exists)
      return res
        .status(403)
        .send({ message: 'User does not exist, register to continue' });

    let compared = await comparePassword(password, exists?.password);

    if (!compared)
      return res.status(400).send({ message: 'Invalid Email or Password' });

    // res.cookie("token", "logged in", {
    //     maxAge: 60 * 1000
    // })

    let accessToken = jwt.sign(
      { userId: exists._id, role: exists.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '5m',
      },
    );

    // console.log(accessToken);

    res.status(200).send({
      message: 'Login successful',
      accessToken,
    });
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
};
