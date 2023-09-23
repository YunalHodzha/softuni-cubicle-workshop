const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: [5, 'Username must be minimum 5 characters long!'],
        validate: {
            validator: function(user) {
                return /^[A-Za-z0-9]+$/.test(user);
            },
            message: props => `${props.value} is not a valid username!`
        },
        required: [true, 'Username required!']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be minimum 8 charachtes long!'],
        validate: {
            validator: function(password) {
                return /^[A-Za-z0-9]+$/.test(password);
            },
            message: props => `Not a valid password!`
        },
        required: [true, 'Password required!']
    },
});

//TODO validate if user exists

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Password missmatch!');
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;