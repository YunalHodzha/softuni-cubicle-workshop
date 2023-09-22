const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const {getDifficultyOptionsViewData} = require('../utils/viewHelpers');

// Path /cubes/create
router.get('/create', (req, res) => {
    console.log(req.user);
    res.render('cube/create');
})

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user._id
    })
    res.redirect('/');
})

router.get('/details/:id', async (req, res) => {
    const cube = await cubeManager.getOneWithAccessories(req.params.id).lean();
    if (!cube) {
        return res.render('404');
    }

    res.render('cube/details', { cube });
});

router.get('/:id/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getCubeById(req.params.id).lean();
    console.log(cube);
    const accessories = await accessoryManager.getOthers(cube.accessories).lean();
    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:id/attach-accessory', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.id;

    await cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cube/details/${cubeId}`);
});

router.get('/:id/delete', async (req, res) => {
    const cube = await cubeManager.getCubeById(req.params.id).lean();
    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/delete', { cube, options });
});

router.post('/:id/delete', async (req, res) => {
    await cubeManager.delete(req.params.id);

    res.redirect('/');
});

router.get('/:id/edit', async (req, res) => {
    const cube = await cubeManager.getCubeById(req.params.id).lean();

    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/edit', { cube, options });
});

router.post('/:id/edit', async (req, res) => {
    const cubeData = req.body;

    await cubeManager.update(req.params.id, cubeData);

    res.redirect(`/cubes/details/${req.params.id}`);
});


module.exports = router;