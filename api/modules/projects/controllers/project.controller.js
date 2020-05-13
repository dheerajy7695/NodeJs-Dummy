'use strict';

const Project = require('../models/project.model');
const projectService = require('../services/project.service');;

module.exports.saveProject = (req, res) => {

    projectService.saveProject(req.body, (err, response) => {
        if (err) {
            console.log('saveProject function have error in controller', err.errmsg);
            if (err && err.status && err.status == '409') {
                res.status(err.status || 409).json({ message: err.errmsg || 'Duplicate key', status: err.status || 409 });
            } else {
                res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
            }
        } else {
            console.log('saveProject function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports.getProjects = (req, res) => {

    projectService.getProjects(req.params, (err, response) => {
        if (err) {
            console.log('getProjects function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getProjects function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports.updateProject = (req, res) => {
    if (!req.body.projectName) {
        return res.status(400).send({ message: "projectName can not be empty" });
    }

    projectService.updateProject(req.params, req.body, (err, response) => {
        if (err) {
            console.log('updateProject function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('updateProject function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports.deleteProject = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: "ProjectId is required" });
    }

    projectService.deleteProject(req.params, (err, response) => {
        if (err) {
            console.log('deleteProject function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('deleteProject function executed successfully in controller');
            res.status(200).json(response);
        }
    });
};

module.exports.getProhectById = (req, res) => {
    if (!req.params.id) {
        return res.status(400).res.json('Id is required');
    }
    projectService.getProjectById(req.params, (err, response) => {
        if (err) {
            console.log('getProhectById function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.errmsg || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getProhectById function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};

module.exports.searchProject = (req, res) => {
    if (!req.params.projectName) {
        return res.status(400).res.json('Project name is required');
    }
    projectService.searchProject(req.params, (err, response) => {
        if (err) {
            console.log('searchProject function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.message || 'Bad request', status: err.status || 400 });
        } else {
            console.log('searchProject function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};

module.exports.getProjectCounts = (req, res) => {
    projectService.getProjectCounts(req.params, (err, response) => {
        if (err) {
            console.log('getProjectCounts function have error in controller', err.errmsg);
            res.status(err.status || 400).json({ message: err.message || 'Bad request', status: err.status || 400 });
        } else {
            console.log('getProjectCounts function executed successfully in controller');
            res.status(200).json(response);
        }
    })
};