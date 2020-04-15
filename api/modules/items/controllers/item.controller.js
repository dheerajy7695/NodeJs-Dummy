'use strict';

const Project = require('../models/item.model');
const projectService = require('../services/item.service');;


module.exports.getItems = (req, res) => {

    projectService.getItems(req.params, (err, response) => {
        if (err) {
            console.log('getItems function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'No record found', status: err.status || 400 });
        } else {
            console.log('getItems function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports.saveItem = (req, res) => {

    projectService.saveItem(req.body, (err, response) => {
        if (err) {
            console.log('saveItem function have error in controller', err.errmsg);
            if (err && err.status && err.status == '409') {
                res.status(err.status || 409).json({ message: err.errmsg || 'Duplicate key', status: err.status || 409 });
            } else {
                res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
            }
        } else {
            console.log('saveItem function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports.updateItem = (req, res) => {
    if (!req.body.itemName) {
        return res.status(400).send({ message: "itemName can not be empty" });
    }

    projectService.updateItem(req.params, req.body, (err, response) => {
        if (err) {
            console.log('updateItem function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('updateItem function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports.deleteItem = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: "ItemId is required" });
    }

    projectService.deleteItem(req.params, (err, response) => {
        if (err) {
            console.log('deleteItem function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('deleteItem function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports.getItemById = (req, res) => {
    if (!req.params.id) {
        return res.status(400).res.json('Id is required');
    }
    projectService.getItemById(req.params, (err, response) => {
        if (err) {
            console.log('getItemById function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getItemById function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};