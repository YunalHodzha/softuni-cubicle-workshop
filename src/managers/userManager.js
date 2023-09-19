const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const User = require('../models/User');

// Terminal Code Generator: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
const SECRET =  'aca52a7bdd63a620527ddf03eecbf73877a418fa6e33b56e19f267b29b10599a';

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

    const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'});

    //return user
    return token;
}

exports.register = (userData) => User.create(userData);