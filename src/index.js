
const express = require('express');
const handlebars = require('express-handlebars');
const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const PORT = 3000;

const app = express();

expressConfig(app);
handlebarsConfig(app);


// Routes
app.get("/", (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));