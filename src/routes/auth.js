const express = require('express');
const router = express.Router();

const { is_required } = require('../helper/index');

const { register, login } = require('../middleware/auth');

// Auth route
router.post('/register', register);
router.post('/login', login);

module.exports = router;
