const Permission = require('../models/permission');
const logger = require('../logger/logger');

const createPermission = async (req, res) => {
    try {
        const { type, action } = req.body;

        // Check if a permission with the same type and action already exists
        const existingPermission = await Permission.findOne({ type, action });
        if (existingPermission) {
            return res.status(400).json({
                status: 'error',
                message:
                    'Permission with the same type and action already exists',
            });
        }

        // Create the new permission
        const newPermission = await Permission.create(req.body);

        logger.info('Permission created successfully:', newPermission);

        return res
            .status(201)
            .json({ status: 'success', data: { permission: newPermission } });
    } catch (error) {
        logger.error('Error creating permission:', error);
        return res
            .status(500)
            .json({ status: 'error', message: 'Internal server error' });
    }
};

const getPermissions = async (req, res) => {
    try {
        // Fetch all permissions
        const permissions = await Permission.find({});
        logger.info('Permissions fetched successfully');

        return res
            .status(200)
            .json({ status: 'success', data: { permissions } });
    } catch (error) {
        logger.error('Error fetching permissions:', error);
        return res
            .status(500)
            .json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = {
    createPermission,
    getPermissions,
};
