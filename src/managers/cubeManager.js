const uniqId = require('uniqid');
const cubes = [{
    id: '1x2ulshjslmj7bhok',
    name: 'Pyraminx',
    description: 'So Much Fun',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg',
    difficultyLevel: 1,
}];

exports.getAll = (search, from, to) => {
    let result = cubes.slice();

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