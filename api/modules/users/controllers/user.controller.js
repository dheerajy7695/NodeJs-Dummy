'use strict';

const User = require('../models/user.model');
var userService = require('../services/user.service');
const logger = require('../../../core/utils/logger');

// Save User function
module.exports.createUser = (req, res) => {

    userService.createUser(req.body, (err, response) => {
        if (err) {
            logger.error('createUser function have error in controller', err);
            res.status(err.status).json({ message: err.message, status: err.status });
        } else {
            logger.info('createUser function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

// Update User
module.exports.updateUser = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: "UserId is required" });
    }
    userService.updateUser(req.params, req.body, (err, response) => {
        if (err) {
            console.log('updateUser function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('updateUser function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

// Login User function
module.exports.loginUser = (req, res) => {

    if (!req.body.username || !req.body.password) {
        res.status(400).json({ status: "404", message: "Username and password are required" });
    }
    userService.loginUser(req.body, (err, response) => {
        if (err) {
            console.log('loginUser function have error in controller', err.errmsg);
            res.status(err.status).json({ message: err.message, status: err.status });
        } else {
            console.log('loginUser function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

// Get users
module.exports.getUsers = (req, res) => {

    userService.getUsers(req.params, (err, response) => {
        if (err) {
            console.log('getUsers function have error in controller', err.errmsg);
            res.status(err.status).json({ message: err.message, status: err.status });
        } else {
            console.log('getUsers function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

// Get user counts
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

// Get user by userId
module.exports.getUserById = (req, res) => {

    userService.getUserByIdEmailOrUsername(req.params, (err, response) => {
        if (err) {
            console.log('getUserByIdEmailOrUsername function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'User not found' });
        } else {
            console.log('getUserByIdEmailOrUsername function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};

// Get user by username
module.exports.getUserByUsername = (req, res) => {

    userService.getUserByIdEmailOrUsername(req.params, (err, response) => {
        if (err) {
            console.log('getUserByIdEmailOrUsername function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'User not found' });
        } else {
            console.log('getUserByIdEmailOrUsername function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};

// Delete user
module.exports.deleteUser = (req, res) => {

    userService.deleteUser(req.params, (err, response) => {
        if (err) {
            console.log('deleteUser function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'User not found' });
        } else {
            console.log('deleteUser function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};

// Get user by Email
module.exports.getUserByEmail = (req, res) => {
    userService.getUserByIdEmailOrUsername(req.params, (err, response) => {
        if (err) {
            console.log('getUserByIdEmailOrUsername function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'User not found' });
        } else {
            console.log('getUserByIdEmailOrUsername function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};