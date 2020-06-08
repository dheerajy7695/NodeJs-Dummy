'use strict';

const Project = require('../models/project.model');

module.exports.saveProject = (projectData, cb) => {

    var projectItem = {};
    Object.keys(projectData).forEach(key => {
        projectItem[key] = projectData[key];
    });

    projectItem.created = Date.now();
    projectItem.updated = Date.now();

    let project = new Project(projectItem);

    project.save((err, response) => {
        if (err) {
            console.log('saveProject function have error', err.errmsg);
            if (err && err.code && err.code == '11000') {
                cb({ message: err.errmsg || 'Duplicate key', status: err.status || 409 });
            } else {
                cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
            }
        } else {
            console.log('saveProject function executed successfully');
            cb(null, response);
        }
    });
};

module.exports.getProjects = (req, cb) => {
    Project.find().sort({ created: -1 }).exec(function (err, response) {
        if (err) {
            console.log('getProjects function has error in project service', err.errmsg);
            cb({ status: err.status || 404, message: err.errmsg || 'Project not found' });
        } else {
            if (response && response.length) {
                console.log('getProjects function executed successfully in service');
                cb(null, response);
            } else {
                console.log('getProjects function has error Project not found');
                cb({ status: 404, message: 'Project not found' });
            }
        }
    });
};

module.exports.updateProject = (params, projectData, cb) => {

    if (!projectData.projectName) {
        return res.status(400).send({ message: "projectName can not be empty" });
    }

    projectData.updated = Date.now();

    let dbQuery = {
        _id: params.id || params._id
    };

    Project.findByIdAndUpdate(dbQuery, projectData, { new: true }, (err, response) => {
        if (err) {
            console.log('update function have error', err.errmsg);
            if (err && err.code && err.code == '11000') {
                cb({ message: err.errmsg || 'Duplicate key', status: err.status || 409 });
            } else {
                cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
            }
        } else {
            console.log('update function executed successfully');
            cb(null, response);
        }
    });
};

module.exports.deleteProject = (params, cb) => {

    let dbQuery = {
        _id: params.id
    };

    Project.findByIdAndRemove(dbQuery, (err, response) => {
        if (err) {
            console.log('deleteProject function have error', err.errmsg);
            cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('deleteProject function executed successfully');
            cb(null, response);
        }
    })
};

module.exports.getProjectById = (params, cb) => {
    let dbQuery = {
        _id: params.id
    };

    Project.findOne(dbQuery, (err, response) => {
        if (err) {
            console.log('getProjectById function have error', err.errmsg);
            cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getProjectById function executed successfully');
            cb(null, response);
        }
    })
};

module.exports.searchProject = (params, cb) => {

    let dbQuery = {
        "$or": [
            {
                projectName: { "$regex": params.projectName, "$options": "i" }
            },
            {
                projectId: { "$regex": params.projectName, "$options": "i" }
            }]
    }

    Project.find(dbQuery, (err, response) => {
        if (err) {
            console.log('searchProject function have error', err.errmsg);
            cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            if (response.length) {
                console.log('searchProject function executed successfully');
                cb(null, response);
            } else {
                console.log('searchProject function have error in service');
                cb({ message: 'No record found', status: 404 });
            }
        }
    })
};

module.exports.getProjectCounts = (params, cb) => {
    Project.count({}, (err, response) => {
        if (err) {
            console.log('getProjectCounts function have error', err.errmsg);
            cb({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getProjectCounts function executed successfully');
            cb(null, { count: response });
        }
    })
};