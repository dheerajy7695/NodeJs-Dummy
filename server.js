'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConnect = require('./api/config/dbConnection')
const userRoutes = require('./api/modules/users/routes/user.routes');
const projectRoutes = require('./api/modules/projects/routes/project.route');
const itemRoutes = require('./api/modules/items/routes/item.route');

const app = express();

const port = process.env.PORT || 4000;

const dbConnection = dbConnect.dbConnection();

app.listen(port, () => {
    console.log('Server is running on port : ', port);
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', itemRoutes);