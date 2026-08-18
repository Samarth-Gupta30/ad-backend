const useModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');




async function userRegisterController(req, res) {

    const { email,  password , name} = req.body;

   const isExists = await useModel.findOne({ email: email });

   if (isExists) {
        return res.status(422).json({ message: 'Email already exists', status: "failed" });
    }

    const user = await useModel.create({ email,password, name });

    const  token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

res.cookie('token', token,)

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
}



async function userLoginController(req, res) {

    const { email, password } = req.body;

    const user = await useModel.findOne({ email: email }).select('+password');

    if (!user) {
        return res.status(400).json({ message: 'User not found', status: "failed" });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid password', status: "failed" });
    }

    const token = jwt.sign({  userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.cookie('token', token)

    res.status(201).json({ 
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
        },
        token,
        message: 'User logged in successfully',
        status: "success"
     });
}

module.exports = {
    userRegisterController,
    userLoginController
};





