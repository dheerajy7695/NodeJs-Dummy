const Joi = require("@hapi/joi").extend(require('@hapi/joi-date'));

const userSchema = Joi.object({
    userId: Joi.string(),
    username: Joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: Joi.string().email().max(25).trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
    firstName: Joi.string().min(2).max(15).required(),
    lastName: Joi.string().min(2).max(15).required(),
    phone: Joi.number().integer().required(),
    gender: Joi.string().min(3).max(10).required(),
});

module.exports = { userSchema };