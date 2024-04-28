const express = require('express');
const { getUserById, getUsers } = require('../controllers/user');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.route('/users/:user_id').get(verifyToken, getUserById);
router.route('/users').get(verifyToken, getUsers);

module.exports = router;
