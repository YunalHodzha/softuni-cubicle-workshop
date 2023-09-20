const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

const User = require('../models/User');

exports.login = async (username, password) => {
    // TODO find user
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Cannot find username or password');
    }

    // TODO validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find username or password');
    }

    // TODO create token
    const payload = {
        _id: user._id,
        username: user.username
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    //return user
    return token;
}

exports.register = (userData) => User.create(userData);