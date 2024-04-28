const express = require('express');
const {
    createTask,
    getAllTasks,
    updateTask,
    updateTaskStatus,
    deleteTask,
} = require('../controllers/task');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.route('/tasks').post(verifyToken, createTask).get(getAllTasks);
router
    .route('/tasks/:task_id')
    .put(verifyToken, updateTask)
    .delete(verifyToken, deleteTask);
router.route('/tasks/:task_id/status').put(verifyToken, updateTaskStatus);

module.exports = router;
