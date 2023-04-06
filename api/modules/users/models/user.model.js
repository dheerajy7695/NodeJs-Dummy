'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userId: { type: String },
    username: {
        type: String,
        require: true,
        unique: true,
        minLength: 3,
        maxLength: 25
    },
    email: {
        type: String,
        require: true,
        unique: true,
        maxLength: 25
    },
    password: {
        type: String,
        require: true,
        minLength: 8
    },
    firstName: {
        type: String,
        require: true,
        minLength: 2,
        maxLength: 15
    },
    lastName: {
        type: String,
        require: true,
        minLength: 2,
        maxLength: 15
    },
    phone: {
        type: Number,
        require: true,
        maxLength: 10
    },
    gender: {
        type: String,
        require: true,
        maxLength: 10
    },
    created: { type: String },
    updated: { type: String }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;