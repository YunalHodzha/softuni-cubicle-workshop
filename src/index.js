const express = require('express');
const mongoose = require('mongoose');

const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');

const PORT = 3000;

const app = express();

expressConfig(app);
handlebarsConfig(app);


// Routes
app.use(homeController);
app.use('/cubes', cubeController);
app.get("*", (req, res) => {
    res.redirect('/404');
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));