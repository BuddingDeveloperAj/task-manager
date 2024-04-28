const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract JWT token from 'Authorization' header

    if (!token) {
        return res
            .status(401)
            .json({ status: 'error', message: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: 'Failed to authenticate token',
            });
        }
        let user = await userModel.findById(decoded.userId).populate({
            path: 'role',
            model: 'Role',
            select: 'role_name',
            populate: {
                path: 'permissions',
                model: 'Permission',
                select: 'type action',
            },
        });
        req.user = user;
        next();
    });
};

module.exports = verifyToken;
