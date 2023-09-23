const mongoose = require('mongoose');

const cubeShcema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        unique: true,
        minLength: [5, 'Name must be minimum 5 characters long!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [20, 'Description must be minimum 20 characters long!'],
        validate: {
            validator: function (cube) {
                return /^[A-Za-z0-9 ]{20,}$/.test(cube);
            },
            message: props => `Not a valid description!`
        },
        required: [true, 'Description is required!']
    },
    imageUrl: {
        type: String,
        required: [true],
        validate: {
            validator: function (url) {
                return /^(http|https):\/\/.*/.test(url);
            },
            message: props => `Not a valid url!`
        },
        required: [true, 'ImageUrl is required!']
    },
    difficultyLevel: Number,
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Cube = mongoose.model('Cube', cubeShcema);

module.exports = Cube;