'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemShema = new Schema({
    itemId: {
        type: String,
        require: true,
        unique: true
    },
    itemName: {
        type: String,
        require: true,
        unique: true
    },
    itemQuantity: {
        type: String,
        require: true
    },
    comments: {
        type: String,
        require: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    created: {
        type: String,
    },
    updated: {
        type: String,
    }
})

module.exports = mongoose.model('Item', ItemShema);