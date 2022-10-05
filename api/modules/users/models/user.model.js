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
        max: 50
    },
    password: {
        type: String,
        require: true,
        max: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        max: 50
    },
    firstName: {
        type: String,
        require: true,
        max: 50
    },
    lastName: {
        type: String,
        require: true,
        max: 50
    },
    phone: {
        type: String,
        require: true,
        max: 50
    },
    securityKey: {
        type: String,
        require: true,
        max: 50
    },
    securityValue: {
        type: String,
        require: true,
        max: 50
    },
    gender: {
        type: String,
        require: true,
        max: 50
    },
    created: { type: String },
    updated: { type: String }
})

module.exports = mongoose.model('User', UserSchema);

UserSchema.pre('save', function (next) {
    var user = this;
    console.log('------------------------>');
    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
});