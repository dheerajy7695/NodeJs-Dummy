'use strict';

const logger = require('../../../core/utils/logger');
const userService = require('../services/user-service');


const create = (req, res) => {
    userService.create(req.body, (err, response) => {
        if (err) {
            logger.error('create function have error in controller ' + err.message);
            res.status(Number(err.status)).json({ status: err.status, message: err.message });
        } else {
            logger.info('create function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

const update = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: "UserId is required" });
    }
    userService.update(req.params, req.body, (err, response) => {
        if (err) {
            logger.error('update function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('update function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

const deleteUser = (req, res) => {
    userService.deleteUser(req.params, (err, response) => {
        if (err) {
            logger.error('deleteUser function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('deleteUser function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};

const getUsers = (req, res) => {

    userService.getUsers(req, (err, response) => {
        if (err) {
            logger.error('getUsers function have error in controller', err.message);
            res.status(err.status).json({ status: err.status, message: err.message });
        } else {
            logger.info('getUsers function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports = { create, update, deleteUser, getUsers };
