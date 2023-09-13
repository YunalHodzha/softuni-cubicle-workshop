const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const notFoundController = require('../controllers/notFoundController');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const cube = cubeManager.getCubeById(id);
    console.log(cube);
    if (cube === undefined) {
        res.render('404');
    } else {
        res.render('details', cube);
    };
})

module.exports = router;