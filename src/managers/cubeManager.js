const uniqId = require('uniqid');
const cubes = [];

exports.getAll = () => cubes.slice();

exports.create = (cubeData) => {

    const newCube = {

        id: uniqId(),
        ...cubeData,
    };

    cubes.push(newCube);

    return newCube;
}

exports.getCubeById = (id) => {
    const cube = cubes.find(item => item.id === id);
    return cube;
}