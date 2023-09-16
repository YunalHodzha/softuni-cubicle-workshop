const express = require('express');

const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');

const routes = require('./routes.js');

const PORT = 3000;

const app = express();

expressConfig(app);
handlebarsConfig(app);
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));