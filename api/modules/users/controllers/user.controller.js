'use strict';

const User = require('../models/user.model');
var userService = require('../services/user.service');


module.exports.createUser = (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        securityKey: req.body.securityKey,
        securityValue: req.body.securityValue,
        gender: req.body.gender,
        created: Date.now(),
        updated: Date.now(),
    })

    if (user._id) {
        user.userId = user._id;
    }
    console.log(user);

    user.save((err, response) => {
        if (err) {
            console.log('Save function have error', err.errmsg);
            if (err && err.code && err.code == '11000') {
                res.status(err.status || 409).json({ message: err.errmsg || 'Duplicate key', status: err.status || 409 });
            } else {
                res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
            }
        } else {
            console.log('Save function executed successfully');
            res.status(200).json(response)
        }
    });
};

module.exports.loginUser = (req, res) => {
    if (req.body.username && req.body.password) {
        let dbQuery = {
            username: req.body.username,
            password: req.body.password
        }

        User.find(dbQuery, (err, userResponse) => {
            if (err) {
                console.log('LoginUser function has error user not found', err.errmsg);
                res.status(400).send("User not found");
            } else {
                if (userResponse && userResponse.length) {
                    console.log('LoginUser function executed successfully', userResponse);
                    res.status(200).json(userResponse[0]);
                } else {
                    console.log('LoginUser function has error user not found');
                    res.status(400).send("User not found");
                }
            }
        });
    } else {
        res.status(400).send("User not found");
    }
};

module.exports.getUsers = (req, res) => {
    User.find().sort({ created: -1 }).exec(function (err, response) {
        if (err) {
            console.log('getUsers function has error user not found', err.errmsg);
            res.status(400).send("User not found");
            res.status(err.status || 404).json({ message: err.errmsg || 'User not found' });
        } else {
            if (response && response.length) {
                console.log('getUsers function executed successfully');
                res.status(200).json(response);
            } else {
                console.log('getUsers function has error user not found');
                res.status(400).send("User not found");
            }
        }
    })
};

module.exports.getUserById = (req, res) => {
    let dbQuery = { userId: req.params.userId };

    User.findOne(dbQuery, function (err, response) {
        if (err) {
            console.log('getUserById function has error user not found', err);
            res.status(err.status || 400).json({ message: err.errmsg || 'User not found' });
        } else {
            console.log('getUserById function executed successfully');
            res.status(200).json(response);
        }
    })
};

exports.getUserByUsername = function (req, res) {
    let dbQuery = { username: req.params.username };

    User.findOne(dbQuery, function (err, response) {
        if (err && response != 'null') {
            console.log('getUserByUsername function has error user not found', err);
            res.status(err.status || 400).json({ message: err.errmsg || 'User not found' });
        } else {
            console.log('getUserByUsername function executed successfully');
            res.status(200).json(response);
        }
    })
};

module.exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.userId, function (err, response) {
        if (err || !response) {
            console.log('deleteUser function has error');
            res.status(404).json({ status: err ? err.status : 404, message: err || 'User not found' });
        } else {
            console.log('deleteUser function executed successfully');
            res.status(200).json(response);
        }
    })
};

module.exports.getUserCounts = (req, res) => {
    userService.getUserCounts(req.params, (err, response) => {
        if (err) {
            console.log('getUserCounts function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.message || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getUserCounts function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};