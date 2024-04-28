const express = require('express');
const { createRole, getRoles } = require('../controllers/role');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.route('/roles').post(verifyToken, createRole).get(getRoles);

module.exports = router;
