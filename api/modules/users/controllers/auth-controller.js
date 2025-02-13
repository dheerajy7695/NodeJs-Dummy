'use strict';

const logger = require('../../../core/utils/logger');
const authService = require('../services/auth-service');


const login = (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ status: 400, message: "Email and password are required" });
    }
    authService.login(req.body, (err, response) => {
        if (err) {
            logger.error('login function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('login function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

const forgetPassword = (req, res) => {

    if (!req.body.email) {
        return res.status(400).json({ status: 400, message: "Email is required" });
    }
    authService.forgetPassword(req.body, (err, response) => {
        if (err) {
            logger.error('forgetPassword function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('forgetPassword function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

const resetPassword = (req, res) => {

    authService.resetPassword(req.params, req.body, (err, response) => {
        if (err) {
            logger.error('resetPassword function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('resetPassword function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};


module.exports = { login, forgetPassword, resetPassword };