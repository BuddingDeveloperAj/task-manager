const Status = require('../models/status');
const logger = require('../logger/logger');
const randomColor = require('randomcolor');

const createStatus = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the status name already exists
        const existingStatus = await Status.findOne({ name });
        if (existingStatus) {
            return res.status(400).json({
                status: 'error',
                message: 'Status with this name already exists',
            });
        }

        let color = randomColor({
            luminosity: 'light',
        });
        // Create the new status
        const newStatus = await Status.create({ name, board_color: color });

        logger.info('Status created successfully:', newStatus);

        return res
            .status(201)
            .json({ status: 'success', data: { status: newStatus } });
    } catch (error) {
        logger.error('Error creating status:', error);
        return res
            .status(500)
            .json({ status: 'error', message: 'Internal server error' });
    }
};

const getStatuses = async (req, res) => {
    try {
        const statuses = await Status.find({}).populate({
            path: 'tasks',
            model: 'Task',
            match: { is_deleted: false },
            populate: {
                path: 'assigned_to',
                model: 'User',
                select: 'first_name last_name',
            },
        });

        return res.status(200).json({
            status: 'success',
            data: statuses,
        });
    } catch (error) {
        logger.error('Error fetching statuses:', error);
        return res
            .status(500)
            .json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = {
    createStatus,
    getStatuses,
};
