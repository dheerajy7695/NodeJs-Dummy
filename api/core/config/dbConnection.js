const mongoose = require('mongoose');
const logger = require('../../core/utils/logger');

// const dbUrl = require('./dbSource');

const dbUrl = { dbUrl: "mongodb://localhost:27017/localDB" };

module.exports.dbConnection = () => {
    mongoose.connect(dbUrl.dbUrl, {})
        .then(() => {
            logger.info('Database connected successfully');
            return 'Connection established successfully';
        }).catch(err => {
            logger.error('Could not connect with database, Exiting now ...', err);
            process.exit(1);
        });
};