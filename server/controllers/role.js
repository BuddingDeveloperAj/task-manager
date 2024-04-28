const Role = require('../models/role');
const logger = require('../logger/logger');

const createRole = async (req, res) => {
    try {
        const { role_name, permissions } = req.body;

        // Check if the role name already exists
        const existingRole = await Role.findOne({ role_name });
        if (existingRole) {
            return res.status(400).json({
                status: 'error',
                message: 'Role with this name already exists',
            });
        }

        // Create the new role
        const newRole = await Role.create({ role_name, permissions });

        logger.info('Role created successfully:', newRole);

        return res
            .status(201)
            .json({ status: 'success', data: { role: newRole } });
    } catch (error) {
        logger.error('Error creating role:', error);
        return res
            .status(500)
            .json({ status: 'error', message: 'Internal server error' });
    }
};

const getRoles = async (req, res) => {
    try {
        // Fetch all roles
        const roles = await Role.find({});

        logger.info('Roles fetched successfully');

        return res.status(200).json({ status: 'success', data: roles });
    } catch (error) {
        logger.error('Error fetching roles:', error);
        return res
            .status(500)
            .json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = {
    createRole,
    getRoles,
};
