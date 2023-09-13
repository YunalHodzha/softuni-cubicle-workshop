const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const cube = cubeManager.getCubeById(id);

    res.render('details', cube);
})

module.exports = router;