'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectShema = new Schema({
    projectId: {
        type: String,
        require: true,
        unique: true
    },
    projectName: {
        type: String,
        require: true,
        unique: true
    },
    managerId: {
        type: String,
        require: true
    },
    managerName: {
        type: String,
        require: true
    },
    managerStartDate: {
        type: String,
        require: true
    },
    custodianId: {
        type: String,
        require: true
    },
    custodianName: {
        type: String,
        require: true
    },
    custodianDate: {
        type: String,
        require: true
    },
    shipDate: {
        type: String,
        require: true
    },
    expiryDate: {
        type: String,
        require: true
    },
    comments: {
        type: String,
        require: true
    },
    created: {
        type: String,
    },
    updated: {
        type: String,
    }
})

module.exports = mongoose.model('Project', ProjectShema);