const bcrypt = require('bcrypt');
const User = require('../model/index');
const rateLimit = require('express-rate-limit');

const is_required = (req, res, next) => {
  const cookie = req.cookies?.['jwt'];
  try {
    if (!cookie) {
      return res
        .status(400)
        .send({ message: 'permission denied login to continue' });
    }
    req.userId = cookie;
    next();
  } catch (error) {
    throw new Error(error);
  }
};

exports.hashpassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const compare = await bcrypt.hash(password, salt);
    return compare;
  } catch (error) {
    throw new Error(error);
  }
};

exports.comparePassword = async (password, encryptedPassword) => {
  try {
    return new Promise((resolve) => {
      return resolve(bcrypt.compare(password, encryptedPassword));
    });
  } catch (error) {
    throw new Error(error);
  }
};