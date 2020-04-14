const mongoose = require('mongoose');
const dbUrl = require('./dbSource')

module.exports.dbConnection = () => {
    mongoose.connect(dbUrl.dbUrl, { useNewUrlParser: true })
        .then(() => {
            console.log('Database connected successfully');
            return 'Connection established successfully';
        }).catch(err => {
            console.log('Could not connect with database, Exiting now ...', err);
            return 'Could not connect with database';
        });
};