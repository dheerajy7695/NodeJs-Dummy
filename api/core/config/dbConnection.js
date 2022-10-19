const mongoose = require('mongoose');
const logger = require('../../core/utils/logger');

// const dbUrl = require('./dbSource');

const dbUrl = { dbUrl: "mongodb://localhost:27017/localdb1" };

mongoose.set('useCreateIndex', true);

module.exports.dbConnection = () => {
    mongoose.connect(dbUrl.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            logger.info('Database connected successfully');
            return 'Connection established successfully';
        }).catch(err => {
            logger.error('Could not connect with database, Exiting now ...', err);
            return 'Could not connect with database';
        });
};