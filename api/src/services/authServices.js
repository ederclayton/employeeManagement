const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const AppError = require('../utils/appError');
const { jwtSecret } = require('../../config/config');

const _10_MIN = 10 * 60;

const comparePassword = async (candidate, target) => {
    try {
        return await Bcrypt.compare(candidate, target);
    } catch (error) {
        return false;
    }
};

const isValidEmail = (candidate) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(candidate);

const authentication = async (email, password) => {
    if (!email || !password) {
        throw new AppError('Authentication failed, no email or password was entered.');
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new AppError('We could not find a registered user with that email.', 404);
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
        throw new AppError('The password entered does not match.', 401);
    }

    const token = Jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: _10_MIN
    });

    const responseData = {
        id: user._id,
        name: user.name,
        email: user.email,
        token
    };

    return responseData;
};

const authorization = async function (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || '';
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.replace('Bearer ', '');
    }

    if (!token) {
        res.status(401);
        res.send({ message: 'No token provided.' });
        return;
    }
    
    try {
        const decoded = await Jwt.verify(token, jwtSecret);
        req.id = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};


const register = async (userData) => {
    if (!userData.name) {
        throw new AppError('No name was informed.');
    }
    if (!userData.email) {
        throw new AppError('No email was informed.');
    }
    if (!isValidEmail(userData.email)) {
        throw new AppError('Invalid informed email.');
    }
    if (!userData.password) {
        throw new AppError('No password was informed');
    }

    const newUser = new UserModel(userData);
    await newUser.save();
};

module.exports = {
    authentication,
    authorization,
    register
};