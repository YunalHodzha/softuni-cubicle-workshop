const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');

// Path /cubes/create
router.get('/create', (req, res) => {
    console.log(cubeManager.getAll());
    res.render('create');
})

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    })
    res.redirect('/');
})

router.get('/details/:id', async (req, res) => {
    const cube = await cubeManager.getCubeById(req.params.id).lean();

    if (!cube) {
        return res.render('404');
    }

    res.render('details', { cube });
})


module.exports = router;