const express = require('express');
const { createStatus, getStatuses } = require('../controllers/status');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router
    .route('/statuses')
    .post(verifyToken, createStatus)
    .get(verifyToken, getStatuses);

module.exports = router;
