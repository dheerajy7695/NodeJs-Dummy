'use strict';
const bcrypt = require('bcrypt');
var async = require('async');
const mongoose = require('mongoose');

const User = require('../models/user.model');
const accessToken = require('../../../core/token/generateToken');
const logger = require('../../../core/utils/logger');
const { formatError } = require('../../../core/utils/utils');


const executePWD = (user) => {

    return new Promise((resolve, reject) => {
        if (!user.password) { return "Password is required"; }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return reject({ status: "400", message: "bad request" });
            } else {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) {
                        return reject({ status: "400", message: "bad request" });
                    } else {
                        user.password = hash;
                        return resolve(null, user);
                    }
                });
            }
        });
    });
};

/* Create user */
module.exports.createUser = async (req, cb) => {

    try {
        let userData = req.body;
        var userObj = {};

        logger.info('createUser API started ', 'userService.createUser', 'USER', req.headers.reqId);

        Object.keys(userData).forEach(key => {
            userObj[key] = userData[key];
        });

        userObj.created = Date.now();
        userObj.updated = Date.now();

        let user = new User(userObj);
        if (user._id) { user.userId = user._id };

        let encryptPwd = await executePWD(user);
        let saveUser = await user.save();
        let token = await accessToken.signAccessToken(saveUser.userId);
        saveUser._doc.token = token;
        if (saveUser._doc) delete saveUser._doc.password;

        logger.info('createUser function completed successfully', 'userService.createUser', 'USER', req.headers.reqId);
        return cb(null, saveUser);

    } catch (err) {
        logger.error('createUser function has error - ' + formatError(err), 'userService.createUser', 'USER', req.headers.reqId);
        return cb({ message: formatError(err), status: err.status || '400' });
    }
};

/* Update user */
module.exports.updateUser = async (req, cb) => {

    let dbQuery = { _id: req.params.userId || req.param.userId };
    let reqPayload = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return cb({ message: "Please provide the correct userId" });
    }

    try {
        let updateuser = await User.findByIdAndUpdate(dbQuery, { $set: reqPayload }, { useFindAndModify: false, new: true });

        if (!updateuser) {
            logger.error('updateUser function has error -', 'userService.updateUser', 'USER', req.headers.reqId);
            cb({ message: formatError(err), status: err.status || 404 });
        } else {
            logger.info('updateUser function executed successfully ', 'userService.updateUser', 'USER', req.headers.reqId);
            if (updateuser._doc) delete updateuser._doc.password;
            cb(null, updateuser);
        }
    } catch (err) {
        logger.error('updateUser function has error - ' + formatError(err), 'userService.updateUser', 'USER', req.headers.reqId);
        cb({ message: formatError(err), status: err.status || 400 });
    }

};

/* Delete user */
module.exports.deleteUser = (req, cb) => {

    User.findByIdAndRemove(req.params.userId, { useFindAndModify: false }, (err, response) => {
        if (err) {
            logger.error('deleteUser function has error - ' + formatError(err), 'userService.deleteUser', 'USER', req.headers.reqId);
            cb({ message: formatError(err), status: err.status || '400' });
        } else {
            logger.info('deleteUser function completed successfully', 'userService.deleteUser', 'USER', req.headers.reqId);
            cb(null, { status: 200, message: response._doc.username + ' - user deleted successfully' });
        }
    });
};

module.exports.loginUser = (req, cb) => {

    let dbQuery = {
        "$or": [
            {
                username: req.body.username
            },
            {
                email: req.body.email
            }]
    };

    User.findOne(dbQuery).exec(function (err, user) {
        if (err || !user) {
            logger.error('loginUser function has error - ' + formatError(err), 'userService.loginUser', 'USER', req.headers.reqId);
            cb({ message: formatError(err), status: err.status || '404' });
        } else {
            bcrypt.compare(req.body.password, user.password, async function (err, result) {
                if (result === true) {
                    let token = await accessToken.signAccessToken(user.userId);
                    delete user._doc.password;
                    user._doc.token = token;

                    logger.info('loginUser function completed successfully', 'userService.loginUser', 'USER', req.headers.reqId);
                    cb(null, user);
                } else {
                    logger.error('loginUser function has error - Wrong password!', 'userService.loginUser', 'USER', req.headers.reqId);
                    cb({ status: "404", message: 'Wrong password!' });
                }
            })
        }
    });
};

module.exports.getUsers = (req, cb) => {

    User.find({}, { password: 0 }).sort({ created: -1 }).exec(function (err, response) {
        if (err) {
            logger.error('getUsers function has error - ' + formatError(err), 'userService.getUsers', 'USER', req.headers.reqId);
            cb({ message: err.message || 'No record found', status: err.status || 400 });
        } else {
            if (response && response.length) {
                cb(null, response);
            } else {
                logger.error('getUsers function has error - User not found', 'userService.getUsers', 'USER', req.headers.reqId);
                cb({ status: "404", message: "User not found" });
            }
        }
    })
};

module.exports.getUserCounts = (req, cb) => {
    User.count({}, (err, response) => {
        if (err) {
            logger.error('getUserCounts function has error - ' + formatError(err), 'userService.getUserCounts', 'USER', req.headers.reqId);
            cb({ message: err.message || 'No record found', status: err.status || 404 });
        } else {
            cb(null, { count: response });
        }
    })
};

module.exports.getUserByIdEmailOrUsername = (req, cb) => {

    let dbQuery = {
        "$or": [
            {
                userId: req.params.userId
            },
            {
                username: req.params.username
            },
            {
                email: req.params.email
            }
        ]
    }

    User.findOne(dbQuery, { password: 0 }, function (err, response) {
        if (err) {
            logger.error('getUserByIdEmailOrUsername function has error - ' + formatError(err), 'userService.getUserByIdEmailOrUsername', 'USER', req.headers.reqId);
            cb({ message: err.message || 'No record found', status: err.status || 400 });
        } else {
            if (response == null) {
                logger.error('getUserByIdEmailOrUsername function has error - No record found', 'userService.getUserByIdEmailOrUsername', 'USER', req.headers.reqId);
                cb({ status: 400, message: 'No record found' });
            } else {
                logger.info('getUserByIdEmailOrUsername function has executed successfully', 'userService.getUserByIdEmailOrUsername', 'USER', req.headers.reqId);
                cb(null, response);
            }
        }
    })
};