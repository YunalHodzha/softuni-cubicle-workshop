const mongoose = require('mongoose');

const cubeShcema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
});

const Cube = mongoose.model('Cube', cubeShcema);