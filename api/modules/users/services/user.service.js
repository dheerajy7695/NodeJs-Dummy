'use strict';

const bcrypt = require('bcrypt');
var async = require('async');

const User = require('../models/user.model');


module.exports.createUser = (userData, cb) => {

    var userObj = {};
    Object.keys(userData).forEach(key => {
        userObj[key] = userData[key];
    });

    userObj.created = Date.now();
    userObj.updated = Date.now();

    let user = new User(userObj);

    if (user._id) { user.userId = user._id }

    encryptPwd(user, (err, user) => {
        if (err) {
            cb({ message: err.message || 'Bad request', status: err.status || "400" });
        } else {
            user.save((err, response) => {
                if (err) {
                    console.log('createUser function have error', err.errmsg);
                    if (err && err.code && err.code == '11000') {
                        cb({ message: err.message || 'Duplicate key', status: err.status || "409" });
                    } else {
                        cb({ message: err.message || 'Bad request', status: err.status || "400" });
                    }
                } else {
                    console.log('createUser function executed successfully');
                    cb(null, response)
                }
            });
        }
    })
};

module.exports.updateUser = (params, reqPayload, cb) => {

    let dbQuery = { _id: params.id || params._id };

    async.waterfall([
        function getUserById(callback) {
            User.findById(dbQuery, (err, response) => {
                if (err) {
                    console.log('getUserById function has error to get user', err);
                    callback(err);
                } else {
                    callback(null, response);
                }
            });
        },

        function encryptPassword(userData, callback) {

            Object.keys(userData).forEach(key => {
                reqPayload[key] = userData[key];
            });

            reqPayload.updated = Date.now();
            let updateObj = new User(reqPayload);

            encryptPwd(updateObj, (err, response) => {
                if (err) {
                    console.log('encryptPassword function has error in updateUser', err);
                    callback(err);
                } else {
                    callback(null, response);
                }
            })
        },

        function updateUsers(updateObj, callback) {

            User.updateOne(dbQuery, { $set: updateObj }, (err, userRes) => {
                if (err) {
                    console.log('Update function has error', err);
                    if (err && err.code && err.code == '11000') {
                        cb({ message: err.message || 'Duplicate key', status: err.status || 409 });
                    } else {
                        cb({ message: err.message || 'Bad request', status: err.status || 400 });
                    }
                } else {
                    callback(null, userRes);
                }
            })
        }
    ], function (err, result) {
        if (err) {
            console.log('updateUser function have error', err.message);
            cb(err);
        } else {
            console.log('updateUser function executed successfully');
            cb(null, result);
        }
    });
};

module.exports.loginUser = (userReqData, cb) => {
    if (!userReqData.username || !userReqData.password) {
        cb({ status: "404", message: "Username and password is required" });
    }

    let dbQuery = {
        "$or": [
            {
                username: userReqData.username
            },
            {
                email: userReqData.username
            }]
    };

    User.findOne(dbQuery).exec(function (err, user) {
        if (err || !user) {
            cb({ status: err ? err.status : "404", message: err ? err.message : "User not found!" });
        } else {
            bcrypt.compare(userReqData.password, user.password, function (err, result) {
                if (result === true) {
                    cb(null, user);
                } else {
                    cb({ status: "404", message: 'Wrong password!' });
                }
            })
        }
    });
}

module.exports.getUsers = (params, cb) => {

    User.find().sort({ created: -1 }).exec(function (err, response) {
        if (err) {
            console.log('getUsers function has error user not found', err.message);
            cb({ message: err.message || 'User not found!', status: err.status || "400" });
        } else {
            if (response && response.length) {
                cb(null, response);
            } else {
                console.log('getUsers function has error user not found');
                cb({ status: "404", message: "User not found" });
            }
        }
    })
};

module.exports.getUserCounts = (params, cb) => {
    User.count({}, (err, response) => {
        if (err) {
            console.log('getUserCounts function have error', err.message);
            cb({ message: err.message || 'Bad request', status: err.status || "400" });
        } else {
            console.log('getUserCounts function executed successfully');
            cb(null, { count: response });
        }
    })
};

module.exports.getUserById = (params, cb) => {

    let dbQuery = { userId: params.userId };

    User.findOne(dbQuery, function (err, response) {
        if (err) {
            console.log('getUserById function has error user not found', err);
            cb({ message: err.message || 'User not found!', status: err.status || "400" });
        } else {
            console.log('getUserById function executed successfully');
            cb(null, response);
        }
    })
};

module.exports.getUserByUsername = (params, cb) => {

    let dbQuery = { username: params.username };

    User.findOne(dbQuery, function (err, response) {
        if (err || !response) {
            console.log('getUserByUsername function has error user not found', err);
            cb({ message: err ? err.message : 'User not found!', status: err ? err.status : "400" });
        } else {
            console.log('getUserByUsername function executed successfully');
            cb(null, response);
        }
    })
};

module.exports.deleteUser = (params, cb) => {

    User.findByIdAndRemove(params.userId, function (err, response) {
        if (err) {
            console.log('deleteUser function has error user not found', err);
            cb({ message: err.message || 'User not found!', status: err.status || "400" });
        } else {
            console.log('deleteUser function executed successfully');
            cb(null, response);
        }
    })
};

module.exports.getUserByEmail = (params, cb) => {

    let dbQuery = { email: params.email };

    User.findOne(dbQuery, function (err, response) {
        if (err || !response) {
            console.log('getUserByEmail function has error user not found', err);
            cb({ message: err.message || 'User not found!', status: err.status || "400" });
        } else {
            console.log('getUserByEmail function executed successfully');
            cb(null, response);
        }
    });
};

function encryptPwd(user, cb) {

    if (!user.password) { return "Password is required"; }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            cb({ status: "400", message: "bad request" });
        } else {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    cb({ status: "400", message: "bad request" });
                } else {
                    user.password = hash;
                    cb(null, user)
                }
            })
        }
    });
};