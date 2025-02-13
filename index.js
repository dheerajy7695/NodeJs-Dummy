'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const dbConnect = require('./api/core/config/dbConnection');
const authRoutes = require('./api/modules/users/routes/auth-routes');
const userRoutes = require('./api/modules/users/routes/user.routes');
const projectRoutes = require('./api/modules/projects/routes/project.route');
const itemRoutes = require('./api/modules/items/routes/item.route');
const logger = require('./api/core/utils/logger');
dotenv.config();

const app = express();

const port = process.env.SERVER_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Welcome to Dheeraj Digital Ready');
});

app.listen(port, () => {
    logger.info(`Server is running on port : ${port}`);
    dbConnect.dbConnection();
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/api', projectRoutes);
app.use('/api', itemRoutes);

app.all('*', (req, res) => {
    res.status(404).json(`Cannot find ${req.originalUrl} on server`);
});

process
    .on('unhandledRejection', (reason, p) => {
        logger.info(`${reason} Unhandled Rejection error ${p} `);
    })
    .on('uncaughtException', err => {
        logger.info('Uncaught Exception thrown - ', err);
        process.exit(1);
    });

module.exports = app;