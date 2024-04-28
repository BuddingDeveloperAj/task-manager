const taskModel = require('../models/task');
const Status = require('../models/status');
const logger = require('../logger/logger');
const { authorize } = require('../utils/helper');

const createTask = async (req, res) => {
    const MODULE_TYPE = 'TASK';
    const MODULE_ACTION = 'UPDATE';

    authorize({ MODULE_TYPE, MODULE_ACTION })(req, res, async () => {
        try {
            const taskData = req.body;
            taskData.created_by = req.user._id;
            const task = await taskModel.create(taskData);

            // Find the corresponding Status document
            const status = await Status.findOne({ _id: task.status });

            // Push the new task's _id into the tasks array of the found status
            status.tasks.push(task._id);

            // Save the updated status document
            await status.save();

            return res.status(200).json({
                status: 'success',
                data: task,
            });
        } catch (error) {
            logger.error(error);
            res.status(200).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    });
};

const getAllTasks = async (req, res) => {
    try {
        // console.log(req.params); // If expecting parameters in the URL
        const tasks = await taskModel.find({
            is_deleted: false,
        });

        return res.status(200).json({
            type: 'success',
            data: tasks,
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            type: 'error',
            message: 'Internal server error',
        });
    }
};

const updateTask = async (req, res) => {
    const MODULE_TYPE = 'TASK';
    const MODULE_ACTION = 'UPDATE';

    const task_id = req.params.task_id;
    const updatedTaskData = req.body;
    const updatedStatusId = req.body.status;
    let toUpdateStatus = false;

    authorize({ MODULE_TYPE, MODULE_ACTION })(req, res, async () => {
        try {
            const task = await taskModel.findById(task_id);

            const currentStatusId = task.status;
            if (updatedStatusId && updatedStatusId !== currentStatusId) {
                toUpdateStatus = true;
            }

            if (toUpdateStatus) {
                await Status.findByIdAndUpdate(
                    currentStatusId,
                    { $pull: { tasks: task_id } },
                    { new: true }
                );

                // Add the task ID to the updated status's task array
                await Status.findByIdAndUpdate(
                    updatedStatusId,
                    {
                        $addToSet: { tasks: task_id },
                    },
                    { new: true }
                );
            }

            Object.assign(task, updatedTaskData);

            const response = await task.save();
            return res.status(200).json({
                status: 'success',
                data: response,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    });
};

const updateTaskStatus = async (req, res) => {
    const MODULE_TYPE = 'TASK';
    const MODULE_ACTION = 'STATUS_UPDATE';

    const task_id = req.params.task_id;
    const new_status_id = req.body.status;

    authorize({ MODULE_TYPE, MODULE_ACTION })(req, res, async () => {
        try {
            const task = await taskModel.findById(task_id);

            const currentStatusId = task.status;
            await Status.findByIdAndUpdate(
                currentStatusId,
                { $pull: { tasks: task_id } },
                { new: true }
            );

            // Find the task by ID and populate the 'status' field
            task.status = new_status_id;
            const response = await task.save();

            // Get the current status ID and the updated status ID

            const updatedStatusId = new_status_id;

            // Add the task ID to the updated status's task array
            await Status.findByIdAndUpdate(
                updatedStatusId,
                {
                    $addToSet: { tasks: task_id },
                },
                { new: true }
            );

            return res.status(200).json({
                status: 'success',
                data: response,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    });
};

const deleteTask = async (req, res) => {
    const MODULE_TYPE = 'TASK';
    const MODULE_ACTION = 'DELETE';

    const task_id = req.params.task_id;

    authorize({ MODULE_TYPE, MODULE_ACTION })(req, res, async () => {
        try {
            const task = await taskModel.findOne({
                _id: task_id,
                is_deleted: false,
            });

            if (!task) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Task not found',
                });
            }

            // Update task with request body
            Object.assign(task, { is_deleted: true });

            await task.save();

            return res.status(200).json({
                status: 'success',
                data: 'Task deleted successfully',
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    });
};

module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    updateTaskStatus,
    deleteTask,
};
