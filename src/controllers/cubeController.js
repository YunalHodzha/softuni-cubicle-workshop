const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');

// Path /cubes/create
router.get('/create', (req, res) => {
    console.log(cubeManager.getAll());
    res.render('create');
})

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    })
    res.redirect('/');
})

router.get('/details/:id', (req, res) => {
    const cube = cubeManager.getCubeById(req.params.id);
    console.log(cube);
    if (cube === undefined) {
        res.render('404');
    } else {
        res.render('details', { cube });
    };
})

router.get('*', (req, res) => {
    res.render('404')
});

module.exports = router;