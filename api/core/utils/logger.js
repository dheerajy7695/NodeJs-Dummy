const winston = require('winston');
const date = require('date-and-time');
const { format } = require('winston');
const { combine, timestamp, colorize, label, printf } = format;

function handleLog(message, method, endpoint, reqId, level, logger, url = undefined) {
    const logData = {
        timestamp: date.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
        message,
        method,
        endpoint,
        url,
        reqId
    };
    return logger[level](logData);
};

const customFormat = printf(({ level, message, label, method, endpoint, url, reqId }) => {

    let methodColon = method ? '-[Method: ' + method + ']' : '';
    let endpointColon = endpoint ? '-[Endpoint: ' + endpoint + ']' : '';
    let urlColon = url ? '-[Url: ' + url + ']' : '';
    let logTraceColon = reqId ? '-[reqId: ' + reqId + ']' : '';

    return `${date.format(new Date(), "YYYY-MM-DD HH:mm:ss")}- [${label}]- ${level} - message: ${message}${methodColon}${endpointColon}${urlColon}${logTraceColon}`;
});

let successLogger = winston.createLogger({
    level: 'info',
    format: combine(label({ label: 'LOCAL' }), format.colorize(), timestamp(), customFormat),
    transports: [new winston.transports.Console()]
});

let errorLogger = winston.createLogger({
    level: 'error',
    format: combine(label({ label: 'LOCAL' }), format.colorize(), timestamp(), customFormat),
    transports: [new winston.transports.Console()]
});

function info(message, method, endpoint, reqId = undefined) {
    handleLog(message, method, endpoint, reqId, 'info', successLogger);
};

function error(message, method, endpoint, reqId = undefined) {
    handleLog(message, method, endpoint, reqId, 'error', errorLogger);
};

module.exports = { info, error };























//    1 -------------------

/*

const winston = require('winston');
const date = require('date-and-time');

let successLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

let errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

function handleLog(message, method, endpoint, reqId, level, logger, url = undefined) {
    const logData = {
        timestamp: date.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
        message,
        method,
        endpoint,
        url,
        reqId
    };

    return logger[level](logData);
};

function info(message, method, endpoint, reqId = undefined) {
    handleLog(message, method, endpoint, reqId, 'info', successLogger);
};

function error(message, method, endpoint, reqId = undefined) {
    handleLog(message, method, endpoint, reqId, 'error', errorLogger);
};

module.exports = { info, error };

*/




















// const { createLogger, format, transports } = require('winston');
// const { combine, timestamp, colorize, label, printf, align } = format;
// const { SPLAT } = require('triple-beam');
// const { isObject } = require('lodash');
// const date = require('date-and-time');


// function formatObject(param) {
//     if (isObject(param)) {
//         return [JSON.stringify(param)];
//     }
//     return [param];
// };

// // Ignore log messages if they have { private: true }
// const all = format((info) => {
//     const splat = info[SPLAT] || [];
//     const message = formatObject(info.message);
//     const rest = splat.map(formatObject).join(' ');
//     info.message = `${message} ${rest}`;
//     return info;
// });

// const logger = createLogger({
//     format: combine(
//         all(),
//         label({ label: 'LOCAL' }),
//         timestamp(),
//         colorize(),
//         printf(info => `${date.format(new Date(), "YYYY-MM-DD HH:mm:ss")} [${info.label}] ${info.level}: ${formatObject(info.message)}`)
//     ),
//     transports: [new transports.Console()]
// });

// module.exports = logger;






// const path = require('path');
// const date = require('date-and-time');

// const { format, createLogger, transports } = require("winston");
// const { combine, timestamp, splat, label, printf } = format;
// const CATEGORY = "DHEERAJ";

// //Using the printf format.
// const customFormat = printf(({ level, message, label, timestamp, ...metadata }) => {
//     return `${date.format(new Date(), "YYYY-MM-DD HH:mm:ss")} [${label}] ${level}: ${message}`;
// });

// const logger = createLogger({
//     level: "debug",
//     format: combine(label({ label: CATEGORY }), format.colorize(), splat(), timestamp(), customFormat),
//     transports: [
//         new transports.Console(),
//     ],
// });

// module.exports = logger;
















// const winston = require('winston');
// const date = require('date-and-time')

// const successLogger = winston.createLogger({
//     level: 'info',
//     // format: winston.format.json(),
//     transports: [
//         new winston.transports.File({ filename: path.join(__dirname, '../logs', 'dk-info.log'), level: 'info' }),
//         new winston.transports.Console()
//     ]
// });

// const errorLogger = winston.createLogger({
//     level: 'error',
//     // format: winston.format.json(),
//     transports: [
//         new winston.transports.File({ filename: path.join(__dirname, '../logs', 'dk-error.log'), level: 'error' }),
//         new winston.transports.Console()
//     ]
// });

// function handleLog(message, method, endpoint, level, logger) {
//     const logData = {
//         timestap: date.format(new Date(), "YYYY-MM-DD HH:MM:ss"),
//         message,
//         method,
//         endpoint
//     }
//     return logger[level](logData);
// };

// function info(message, method, endpoint) {
//     handleLog(message, method, endpoint, 'info', successLogger);
// }
// function error(message, method, endpoint) {
//     handleLog(message, method, endpoint, 'error', errorLogger);
// }

// module.exports = { info, error };









// -----------------2----------

// const { createLogger, format, transports } = require('winston');
// module.exports = createLogger({
//     transports:
//         new transports.File({
//             filename: 'logs/server.log',
//             format: format.combine(
//                 format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
//                 format.align(),
//                 format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
//             )
//         }),
// });

