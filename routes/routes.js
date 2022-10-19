const express = require('express');

const userRoutes = require('../api/modules/users/routes/user.routes');

const app = express();


app.use('api', userRoutes);