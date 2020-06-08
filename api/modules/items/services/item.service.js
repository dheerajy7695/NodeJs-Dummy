'use strict';

var async = require('async');

const Item = require('../models/item.model');
const Project = require('../../projects/models/project.model');

module.exports.getItems = (params, cb) => {
    Item.find().populate('projectId').sort({ created: -1 }).exec(function (err, response) {
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

module.exports.saveItem = (itemData, cb) => {

    var saveRequest = async () => {
        var itemObj = {};
        Object.keys(itemData).forEach(key => {
            itemObj[key] = itemData[key];
        });

        itemObj.created = Date.now();
        itemObj.updated = Date.now();

        let dbQuery = { projectName: itemData.projectName };
        let getProject = await Project.findOne(dbQuery);
        console.log('getProject------>', getProject);

        itemObj.projectId = getProject._id;
        let item = new Item(itemObj);
        var savedItem = await item.save();
        console.log('savedItem------>', savedItem);

        return savedItem;
    }

    saveRequest()
        .then(result => {
            console.log('saveItem function executed successfully');
            cb(null, result);
        })
        .catch(err => {
            console.log('saveItem function have error', err.errmsg);
            if (err && err.code && err.code == '11000') {
                cb({ message: err.message || 'Duplicate key', status: err.status || 409 });
            } else {
                cb({ message: err.message || 'Bad request', status: err.status || 400 });
            }
        })
};

module.exports.updateItem = (params, reqPayload, cb) => {

    let dbQuery = {
        _id: params.id || params._id
    };

    async.waterfall([
        function getItemById(callback) {
            Item.findById(dbQuery, (err, response) => {
                if (err) {
                    console.log('getItemById function has error for get item', err);
                    callback(err);
                } else {
                    callback(null, response);
                }
            });
        },
        function getProjectByName(itemObj, callback) {

            let projectQuery = { projectName: reqPayload.projectName };

            Project.findOne(projectQuery, (err, projectRes) => {
                if (err) {
                    console.log('findOne function has error for get project', err);
                    callback(err);
                } else {
                    callback(null, itemObj, projectRes);
                }
            })
        },
        function updateItems(itemObj, projectRes, callback) {

            Object.keys(itemObj).forEach(key => {
                reqPayload[key] = itemObj[key];
            });

            reqPayload.updated = Date.now();
            reqPayload.projectId = projectRes._id.toString();
            let updateObj = new Item(reqPayload);

            Item.update(dbQuery, updateObj, { new: true }, (err, projectResponse) => {
                if (err) {
                    console.log('findOne function has error for get project', err);
                    callback(err);
                } else {
                    callback(null, projectResponse);
                }
            })
        }
    ], function (err, result) {
        if (err) {
            console.log('updateItem function have error', err.message);
            if (err && err.code && err.code == '11000') {
                cb({ message: err.message || 'Duplicate key', status: err.status || 409 });
            } else {
                cb({ message: err.message || 'Bad request', status: err.status || 400 });
            }
        } else {
            console.log('updateItem function executed successfully');
            cb(null, result);
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

module.exports.searchItem = (params, cb) => {
    let dbQuery = {
        itemName: { "$regex": params.itemName, "$options": "i" }
    };

    Item.find(dbQuery, (err, response) => {
        if (err) {
            console.log('searchItem function have error', err.errmsg);
            cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            if (response && response.length) {
                console.log('searchItem function executed successfully');
                cb(null, response);
            } else {
                console.log('searchItem function have error in service');
                cb({ message: 'No record found', status: 404 });
            }
        }
    })
};

module.exports.getItemCounts = (params, cb) => {
    Item.count({}, (err, response) => {
        if (err) {
            console.log('getItemCounts function have error', err.errmsg);
            cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getItemCounts function executed successfully');
            cb(null, { count: response });
        }
    })
};