const express = require('express');
const { registerUser, loginUser } = require('../controllers/authenticate');
const router = express.Router();

router.route('/users/signup').post(registerUser);
router.route('/users/signin').post(loginUser);

module.exports = router;
