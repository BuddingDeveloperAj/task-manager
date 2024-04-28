const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const taskRoutes = require('./task');
const authRoutes = require('./authenticate');
const permissionRoutes = require('./permission');
const statusRoutes = require('./status');
const roleRoutes = require('./role');

router.use(userRoutes);
router.use(taskRoutes);
router.use(authRoutes);
router.use(permissionRoutes);
router.use(statusRoutes);
router.use(roleRoutes);

module.exports = router;
