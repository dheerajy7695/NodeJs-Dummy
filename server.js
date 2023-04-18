'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid')

const dbConnect = require('./api/core/config/dbConnection')
const userRoutes = require('./api/modules/users/routes/user.routes');
const projectRoutes = require('./api/modules/projects/routes/project.route');
const itemRoutes = require('./api/modules/items/routes/item.route');
const logger = require('./api/core/utils/logger');

const app = express();

const port = process.env.HTTP_PORT || 4000;

/* Generate reqId  */
app.use((req, res, next) => {
    req.headers.reqId = uuidv4();
    next();
});


dbConnect.dbConnection();

app.get('/', (req, res) => {
    res.send('Welcome to Dheeraj Digital Ready', req);
})

app.listen(port, () => {
    logger.info(`Server is running on port : ${port}`);
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', itemRoutes);

module.exports = app;