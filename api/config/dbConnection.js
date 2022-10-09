const mongoose = require('mongoose');
// const dbUrl = require('./dbSource');

const dbUrl = { dbUrl: "mongodb://localhost:27017/localdb1" };

mongoose.set('useCreateIndex', true);
module.exports.dbConnection = () => {
    mongoose.connect(dbUrl.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database connected successfully');
            return 'Connection established successfully';
        }).catch(err => {
            console.log('Could not connect with database, Exiting now ...', err);
            return 'Could not connect with database';
        });
};