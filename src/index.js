const express = require('express');

const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const dbConnect = require('./config/dbConfig.js');
const routes = require('./routes.js');

const PORT = 3000;

const app = express();
expressConfig(app);
handlebarsConfig(app);

dbConnect()
    .then(() => console.log('DB Conected successfully'))
    .catch((err) => {
        console.log("DB error: ", err);
    })

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));