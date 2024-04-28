const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const logger = require('../logger/logger');

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        // Check if the email is already registered
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'Email already registered', status: 'error' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user in the database
        const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            role,
            password: hashedPassword,
        });

        // Generate JWT token for authentication
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d',
            }
        );

        await newUser.populate({
            path: 'role',
            model: 'Role',
            select: 'role_name',
            populate: {
                path: 'permissions',
                model: 'Permission',
                select: 'type action',
            },
        });

        // Respond with success message and token
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: {
                token,
                _id: newUser._id,
                user: {
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                },
                role: newUser.role,
            },
        });
    } catch (error) {
        console.log(error);
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await userModel.findOne({ email }).populate({
            path: 'role',
            model: 'Role',
            select: 'role_name',
            populate: {
                path: 'permissions',
                model: 'Permission',
                select: 'type action',
            },
        });

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }

        // Check if the provided password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }

        // Generate JWT token for authentication
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Token expires in 1 hour
        });

        // Respond with success message and token
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                token,
                _id: user._id,
                user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                },
                role: user.role,
            },
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
