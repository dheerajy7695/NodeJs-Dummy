'use strict';

var userService = require('../services/user.service');
const logger = require('../../../core/utils/logger');

/* Create user function  */
module.exports.createUser = (req, res) => {

    userService.createUser(req, (err, response) => {
        if (err) {
            logger.error('createUser function have error in controller- ' + err.message, 'userController.createUser', 'USER', req.headers.reqId);
            res.status(Number(err.status)).json({ message: err.message, status: err.status });
        } else {
            logger.info('createUser function executed successfully', 'userController.createUser', 'USER', req.headers.reqId);
            res.status(200).json(response);
        }
    });
};

/* Update user function  */
module.exports.updateUser = (req, res) => {
    if (!req.params.userId) {
        logger.error('updateUser function have error in controller - userId is required', 'userController.updateUser', 'USER', req.headers.reqId);
        return res.status(400).send({ message: "userId is required" });
    }
    userService.updateUser(req, (err, response) => {
        if (err) {
            logger.error('updateUser function have error in controller' + err.message, 'userController.updateUser', 'USER', req.headers.reqId);
            res.status(Number(err.status | 400)).json({ message: err.message, status: err.status | 400 });
        } else {
            logger.info('updateUser function executed successfully', 'userController.updateUser', 'USER', req.headers.reqId);
            res.status(200).json(response);
        }
    });
};

/* Delete user function  */
module.exports.deleteUser = (req, res) => {

    userService.deleteUser(req, (err, response) => {
        if (err) {
            logger.error('deleteUser function have error in controller' + err.message, 'userController.deleteUser', 'USER', req.headers.reqId);
            res.status(Number(err.status)).json({ message: err.message, status: err.status });
        } else {
            logger.info('deleteUser function executed successfully', 'userController.deleteUser', 'USER', req.headers.reqId);
            res.status(200).json(response);
        }
    })
};

/* Login user function  */
module.exports.loginUser = (req, res) => {

    if (!req.body.username || !req.body.password) {
        if (!req.body.username) {
            logger.error('loginUser function have error in controller - Username is required', 'userController.loginUser', 'USER', req.headers.reqId);
            return res.status(400).send({ message: "Password is required" });
        }
        if (!req.body.password) {
            logger.error('loginUser function have error in controller - Password is required', 'userController.loginUser', 'USER', req.headers.reqId);
            return res.status(400).send({ message: "Password is required" });
        }
    }
    userService.loginUser(req, (err, response) => {
        if (err) {
            logger.error('loginUser function have error in controller' + err.message, 'userController.loginUser', 'USER', req.headers.reqId);
            res.status(Number(err.status)).json({ message: err.message, status: err.status });
        } else {
            logger.info('loginUser function executed successfully', 'userController.loginUser', 'USER', req.headers.reqId);
            res.status(200).json(response);
        }
    });
};

/* Get users function  */
module.exports.getUsers = (req, res) => {

    userService.getUsers(req, (err, response) => {
        if (err) {
            logger.error('getUsers function have error in controller' + err.message, 'userController.getUsers', 'USER', req.headers.reqId);
            res.status(Number(err.status)).json({ message: err.message, status: err.status });
        } else {
            logger.info('getUsers function executed successfully', 'userController.getUsers', 'USER', req.headers.reqId);
            res.status(200).json(response);
        }
    });
};

/* Get user count function  */
module.exports.getUserCounts = (req, res) => {

    userService.getUserCounts(req, (err, response) => {
        if (err) {
            logger.error('getUserCounts function have error in controller' + err.message, 'userController.getUserCounts', 'USER', req.headers.reqId);
            res.status(Number(err.status)).json({ message: err.message, status: err.status });
        } else {
            logger.info('getUserCounts function executed successfully', 'userController.getUserCounts', 'USER', req.headers.reqId);
            res.status(200).json(response);
        }
    })
};

/* Get user by userId function  */
module.exports.getUserById = (req, res) => {

    userService.getUserByIdEmailOrUsername(req, (err, response) => {
        if (err) {
            logger.error('getUserById function have error in controller' + err.message, 'userController.getUserById', 'USER', req.headers.reqId);
            res.status(Number(err.status)).json({ message: err.message, status: err.status });
        } else {
            logger.info('getUserById function executed successfully', 'userController.getUserById', 'USER', req.headers.reqId);
            res.status(200).json(response);
        }
    })
};

/* Get user by username function */
module.exports.getUserByUsername = (req, res) => {

    userService.getUserByIdEmailOrUsername(req, (err, response) => {
        if (err) {
            logger.error('getUserByIdEmailOrUsername function have error in controller' + err.message, 'userController.getUserByIdEmailOrUsername', 'USER', req.headers.reqId);
            res.status(Number(err.status)).json({ message: err.message, status: err.status });
        } else {
            logger.info('getUserByIdEmailOrUsername function executed successfully', 'userController.getUserByIdEmailOrUsername', 'USER', req.headers.reqId);
            res.status(200).json(response);
        }
    })
};

/* Get user by email function */
module.exports.getUserByEmail = (req, res) => {
    userService.getUserByIdEmailOrUsername(req, (err, response) => {
        if (err) {
            logger.error('getUserByIdEmailOrUsername function have error in controller' + err.message, 'userController.getUserByIdEmailOrUsername', 'USER', req.headers.reqId);
            res.status(Number(err.status)).json({ message: err.message, status: err.status });
        } else {
            logger.info('getUserByIdEmailOrUsername function executed successfully', 'userController.getUserByIdEmailOrUsername', 'USER', req.headers.reqId);
            res.status(200).json(response);
        }
    })
};