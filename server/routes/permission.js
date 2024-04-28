const express = require('express');
const {
    createPermission,
    getPermissions,
} = require('../controllers/permission');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router
    .route('/permissions')
    .post(verifyToken, createPermission)
    .get(verifyToken, getPermissions);

module.exports = router;
