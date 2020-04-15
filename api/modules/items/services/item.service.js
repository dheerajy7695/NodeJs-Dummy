'use strict';

const Item = require('../models/item.model');


module.exports.getItems = (req, cb) => {
    Item.find().sort({ created: -1 }).exec(function (err, response) {
        if (err) {
            console.log('getItems function has error in project service', err.errmsg);
            cb({ status: err.status || 404, message: err.errmsg || 'No record found' });
        } else {
            if (response && response.length) {
                console.log('getItems function executed successfully in service');
                cb(null, response);
            } else {
                console.log('getItems function has error Item not found');
                cb({ status: 404, message: 'No record found' });
            }
        }
    });
};

module.exports.saveItem = (projectData, cb) => {

    var itemObj = {};
    Object.keys(projectData).forEach(key => {
        itemObj[key] = projectData[key];
    });

    itemObj.created = Date.now();
    itemObj.updated = Date.now();

    let project = new Item(itemObj);

    project.save((err, response) => {
        if (err) {
            console.log('saveItem function have error', err.errmsg);
            if (err && err.code && err.code == '11000') {
                cb({ message: err.errmsg || 'Duplicate key', status: err.status || 409 });
            } else {
                cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
            }
        } else {
            console.log('saveItem function executed successfully');
            cb(null, response);
        }
    });
};

module.exports.updateItem = (params, projectData, cb) => {

    projectData.updated = Date.now();

    let dbQuery = {
        _id: params.id || params._id
    };

    Item.findByIdAndUpdate(dbQuery, projectData, { new: true }, (err, response) => {
        if (err) {
            console.log('updateItem function have error', err.errmsg);
            if (err && err.code && err.code == '11000') {
                cb({ message: err.errmsg || 'Duplicate key', status: err.status || 409 });
            } else {
                cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
            }
        } else {
            console.log('updateItem function executed successfully');
            cb(null, response);
        }
    });
};

module.exports.deleteItem = (params, cb) => {

    let dbQuery = {
        _id: params.id
    };

    Item.findByIdAndRemove(dbQuery, (err, response) => {
        if (err) {
            console.log('deleteItem function have error', err.errmsg);
            cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('deleteItem function executed successfully');
            cb(null, response);
        }
    })
};

module.exports.getItemById = (params, cb) => {
    let dbQuery = {
        _id: params.id
    };

    Item.findOne(dbQuery, (err, response) => {
        if (err) {
            console.log('getItemById function have error', err.errmsg);
            cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getItemById function executed successfully');
            cb(null, response);
        }
    })
};