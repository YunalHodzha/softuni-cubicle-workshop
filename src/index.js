
const express = require('express');
const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');
const detailController = require('./controllers/detailController.js');

const PORT = 3000;

const app = express();

expressConfig(app);
handlebarsConfig(app);


// Routes
app.use(homeController);
app.use('/cubes', cubeController);
app.use('/details', detailController);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));