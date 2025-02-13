'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user-model');
const logger = require('../../../core/utils/logger');
const accessToken = require('../../../core/token/generateToken');


const login = async (reqPayload, cb) => {

    try {
        const { email, password } = reqPayload;

        if (!email || !password) {
            return cb({ status: 404, message: "Email and password are required!" });
        }

        const dbUser = await UserModel.findOne({ email });

        if (!dbUser) {
            logger.error('login function has error - user not found', email);
            return cb({ status: 404, message: `User not found with this email ${email}` });
        }

        const validatePwd = await bcrypt.compare(password, dbUser.password);
        if (!validatePwd) {
            logger.error('login function has error - password is incorrect');
            return cb({ status: 400, message: "Please check, password is incorrect" });
        }

        const token = await accessToken.generateSignToken(dbUser._doc._id.toString());

        if (token) {
            if (dbUser._doc.password) delete dbUser._doc.password;
            dbUser._doc.token = token;

            logger.info('login function executed successfully for email ', email);
            return cb(null, { status: 200, user: dbUser });
        } else {
            logger.error('login function has error while generating token');
            return cb({ status: 400, message: "token is not generated" });
        }
    } catch (err) {
        logger.error('login function has error', err);
        return cb({ status: err.status || 400, message: err.message || "Something went wrong, please try again" });
    }
};

const forgetPassword = async (payload, cb) => {

    try {
        const { email } = payload;

        const dbUser = await UserModel.findOne({ email });
        if (!dbUser) {
            logger.error('forgetPassword function has error - user not found', email);
            return cb({ status: 404, message: `User not found with this email ${email}` })
        }

        const getToken = await accessToken.generateSignToken(dbUser._doc._id.toString());

        const link = `http://localhost:4000/api/auth/reset-password/${dbUser._id}/${getToken}`;

        logger.info('forgetPassword function is executed successfully');
        return cb(null, { status: 200, resetPasswordLink: link });
    } catch (err) {
        logger.error('forgetPassword function has error', err);
        return cb({ status: err.status || 500, message: err.message || "Something went wrong, please try again" });
    }
};

const resetPassword = async (params, payload, cb) => {

    try {

        const { id, token } = params;
        const { password } = payload;

        const dbUser = await UserModel.findOne({ _id: id });
        if (!dbUser) {
            logger.error('resetPassword function has error - user not found', email);
            return cb({ status: 404, message: `User not found with this email ${email}` });
        }

        const verifyTokenSecret = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!verifyTokenSecret) {
            logger.error('resetPassword function has error - invaild token');
            return cb({ status: 400, message: `Invlid token!` });
        }

        const encreptPassword = await bcrypt.hash(password, 10);
        const updatedPassword = await UserModel.updateOne({ _id: id }, { $set: { password: encreptPassword } });
        if (!updatedPassword) {
            logger.error('resetPassword function has error - while updating password');
            return cb({ status: 400, message: `Invlid token!` });
        }

        logger.info('resetPassword function is executed successfully in service');
        return cb(null, { status: 201, message: 'Password updated successfully' });
    } catch (err) {
        logger.error('resetPassword function has error ', err);
        return cb({ status: err.status || 500, message: err.message || 'Something went wrong, please try again' });
    }
};

module.exports = { login, forgetPassword, resetPassword };