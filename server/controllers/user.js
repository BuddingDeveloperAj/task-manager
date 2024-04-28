const logger = require('../logger/logger');
const userModel = require('../models/user');

const getUserById = async (req, res) => {
    try {
        let user_id = req.params.user_id;
        const user = await userModel.findById(user_id);

        if (!user) {
            logger.info('User not found ', user_id);
            return res.status(404).json({
                status: 'error',
                message: 'User not found for given user ID',
            });
        }

        const { password, ...userData } = user.toObject();

        return res.status(200).json({
            status: 'success',
            data: userData,
        });
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            // Handle CastError specifically for invalid ObjectId
            logger.error('Invalid user ID:', error);
            return res.status(400).json({
                status: 'error',
                message: 'Invalid user ID provided',
            });
        } else {
            // Handle other unexpected errors
            logger.error('Error fetching user by ID:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({});

        return res.status(201).json({
            status: 'success',
            data: users,
        });
    } catch (error) {
        logger.log(error);
        return res.status(201).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getUserById,
    getUsers,
};
