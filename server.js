'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConnect = require('./api/core/config/dbConnection')
const userRoutes = require('./api/modules/users/routes/user.routes');
const projectRoutes = require('./api/modules/projects/routes/project.route');
const itemRoutes = require('./api/modules/items/routes/item.route');
const logger = require('./api/core/utils/logger');

const app = express();

const port = process.env.HTTP_PORT || 5000;

dbConnect.dbConnection();

app.get('/', (req, res) => {
    res.send('Welcome to Dheeraj Digital Ready');
})

app.listen(port, () => {
    logger.info(`Server Web APi is running on port : ${port} mode`);
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', itemRoutes);

module.exports = app;