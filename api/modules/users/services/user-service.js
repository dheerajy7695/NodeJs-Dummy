'use strict';
const bcrypt = require('bcrypt');

const UserModel = require('../models/user-model');
const logger = require('../../../core/utils/logger');
const accessToken = require('../../../core/token/generateToken');


module.exports.create = async (userData, cb) => {

    try {
        const userExist = await UserModel.findOne({ email: userData.email });
        if (userExist) {
            logger.error('create function has error - user already exist', userData.email);
            return cb({ status: 409, message: 'User already exist!' });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
        const hashedPassward = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassward;

        const createUserObj = new UserModel(userData);
        const newUser = await createUserObj.save();

        const token = await accessToken.generateSignToken(newUser?._doc?._id.toString());
        newUser._doc.token = token;
        if (newUser?._doc?.password) delete newUser._doc.password;

        logger.info('create user function executed successfully');
        return cb(null, newUser);
    } catch (err) {
        logger.error('create user function has error', err);
        if (err?.code) {
            return cb({ message: err.message || 'Something went wrong, please try again!', status: 409 });
        } else {
            return cb({ message: err.message || 'Something went wrong, please try again!', status: err.status || "400" });
        }
    }
};

module.exports.update = async (params, reqPayload, cb) => {

    let dbQuery = { _id: params.id || params._id };

    try {
        if (reqPayload.password) cb({ status: 400, message: 'Ypu can not update the password using this endpoint' });

        const userExist = await UserModel.findById(dbQuery);
        if (!userExist) {
            logger.error('update user function has error- user not found');
            cb({ status: 404, message: "User not found or you don't have access for this operation" });
        }

        const updateObj = await UserModel.findByIdAndUpdate(dbQuery, reqPayload, { runValidators: true }, { new: false });

        if (updateObj?._doc?.password) delete updateObj._doc.password;
        logger.info('update user function executed successfully');
        cb(null, updateObj);
    } catch (error) {
        logger.error('update user function has error- user not found');
        cb({ status: error.error || 404, message: error.message || "User not found or you don't have access for this operation " });
    }
};

module.exports.deleteUser = async (params, cb) => {

    let dbQuery = { _id: params.id || params._id };

    try {
        const deleteUser = await UserModel.findByIdAndDelete(dbQuery);
        if (deleteUser) {
            logger.info('deleteUser user function executed successfully');
            cb(null, deleteUser._doc.email);
        } else {
            logger.error('deleteUser function has error - User not found!');
            cb({ status: 404, message: 'User not found!' });
        }
    } catch (err) {
        logger.error('deleteUser function has error', err);
        cb({ status: err.status || 404, message: err.message || 'User not found!' });
    }
};

module.exports.getUsers = async (params, cb) => {
    try {
        const userData = await UserModel.find().sort({ created: -1 });

        if (userData) {
            logger.info('getUsers function has executed successfully');
            cb(null, { status: 201, users: userData });
        } else {
            logger.error('getUsers function has error', err);
            cb({ status: 404, message: 'User not found!' });
        }
    } catch (err) {
        logger.error('getUsers function has error', err);
        cb({ status: err.status || 404, message: err.message || 'User not found!' });
    }
};