const logger = require('../../../core/utils/logger');
const _ = require('underscore');

const middleware = (schema) => {
    return (req, res, next) => {
        logger.info(`User request body validation started - userValidateSchema`);
        if (_.isEmpty(req.body)) return res.status(400).json({ status: false, error: "Invalid request body" });

        const { error } = schema.validate(req.body, { abortEarly: false });
        const promise = [];
        let valid = _.isEmpty(error);

        if (req.body.phone && (req.body.phone.toString().length) >= 11) {
            valid = false;
            promise.push(`phone must be less than or equal to 10 characters`);
        }

        if (valid) {
            return next();
        } else if (error && error.details && error.details.length !== 0) {
            const { details } = error;
            for (var err of details) {
                // err.message = "";
                let label = err.context.label;

                if (err.type == "string.min" || err.type == "number.min") {
                    promise.push(`${label} length must be at least ${err && err.context.limit} characters`);
                }
                if (err.type == "string.max" || err.type == "number.max") {
                    promise.push(`${label} must be less than or equal to ${err && err.context.limit} characters`);
                }
                if ((err.type === "string.base") && (err.context.value != "" && err.context.value != null)) {
                    promise.push(`${label} must be an string`);
                }
                if (err.type === "number.base") {
                    promise.push(`${label} must be an number`);
                }
                if ((err.context.value === "") || (err.context.value === null)) {
                    promise.push(`This field is mandatory : ${label}`);
                }
            }
        }

        Promise.all(promise).then((result) => {
            if (_.compact(result).length === 0) {
                logger.info(`User request body validation success - userValidateSchema`);
                return next();
            }

            logger.error(`User request body validation failed - userValidateSchema`);
            return res.status(400).json({ status: 400, error: result });
        }).catch((err) => {
            logger.error(`User request body validation failed - userValidateSchema`);
            return res.status(400).json({ status: 400, error: err.message });
        })
    }
};

module.exports = middleware;