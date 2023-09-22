const Cube = require('../models/Cube');

exports.getCubeById = (id) => Cube.findById(id);
exports.getOneWithAccessories = (id) => this.getCubeById(id).populate('accessories');

exports.getAll = async (search, from, to) => {
    let result = await Cube.find().lean();

    // TODO: use mongoose to filter the db
    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result = result.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return result;
};

exports.create = async (cubeData) => {
    const cube = new Cube(cubeData);
    await cube.save();

    return cube;
};

exports.update = (id, cubeData) => Cube.findByIdAndUpdate(id, cubeData);

exports.delete = (id) => Cube.findByIdAndDelete(id);

exports.attachAccessory = async (cubeId, accessoryId) => {
    return Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } });
};

