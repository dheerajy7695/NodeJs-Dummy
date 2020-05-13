'use strict';

const itemService = require('../services/item.service');;


module.exports.getItems = (req, res) => {

    itemService.getItems(req.params, (err, response) => {
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

    itemService.saveItem(req.body, (err, response) => {
        if (err) {
            console.log('saveItem function have error in controller', err.errmsg);
            res.status(err.status).json({ message: err.message, status: err.status });
        } else {
            console.log('saveItem function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports.updateItem = (req, res) => {
    if (!req.body.itemName) {
        return res.status(400).send({ message: "Iem name can not be empty" });
    }

    itemService.updateItem(req.params, req.body, (err, response) => {
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

    itemService.deleteItem(req.params, (err, response) => {
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
    itemService.getItemById(req.params, (err, response) => {
        if (err) {
            console.log('getItemById function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getItemById function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};

module.exports.searchItem = (req, res) => {
    if (!req.params.itemName) {
        return res.status(400).res.json('Item name is required');
    }
    itemService.searchItem(req.params, (err, response) => {
        if (err) {
            console.log('searchItem function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.message || 'Bad request', status: err.status || 400 });
        } else {
            console.log('searchItem function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};

module.exports.getItemCounts = (req, res) => {
    itemService.getItemCounts(req.params, (err, response) => {
        if (err) {
            console.log('getItemCounts function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.message || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getItemCounts function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};