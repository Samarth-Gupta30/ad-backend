const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');

async function userRegisterController(req, res) {
    try {
        const { email, password, name } = req.body;

        const isExists = await userModel.findOne({ email });

        if (isExists) {
            return res.status(422).json({ message: 'Email already exists', status: "failed" });
        }

        const user = await userModel.create({ email, password, name });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
            message: 'User registered successfully',
            status: "success"
        });

        await emailService.sendRegistrationEmail(user.email, user.name);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ message: 'User not found', status: "failed" });
        }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password', status: "failed" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
            message: 'User logged in successfully',
            status: "success"
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    userRegisterController,
    userLoginController
};