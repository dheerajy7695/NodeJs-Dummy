'use strict';

const User = require('../models/user.model');

module.exports.getUsers = (req, res, callback) => {

    User.find().sort({ created: -1 }).exec(function (err, response) {
        if (err) {
            console.log('getUsers function has error user not found', err.errmsg);
            callback(err);
        } else {
            if (response && response.length) {
                callback(response);
            } else {
                console.log('getUsers function has error user not found');
                callback("User not found");
            }
        }
    })
};

module.exports.getUserCounts = (params, cb) => {
    User.count({}, (err, response) => {
        if (err) {
            console.log('getUserCounts function have error', err.errmsg);
            cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getUserCounts function executed successfully');
            cb(null, { count: response });
        }
    })
};