const router = require('express').Router();

const accessoryManager = require('../managers/accessoryManager');
const { extractErrorMessages } = require('../middlewares/errorHandlerMiddleware');

router.get('/create', (req, res) => {
    res.render('accessory/create');
})

router.post('/create', async (req, res) => {
    const { name, description, imageUrl } = req.body;

    try {
        await accessoryManager.create({ name, description, imageUrl })

        res.redirect('/');
    } catch (err) {
        const errorMessage = extractErrorMessages(err);
        res.status(404).render('accessory/create', { errorMessage });
    }
})

module.exports = router;