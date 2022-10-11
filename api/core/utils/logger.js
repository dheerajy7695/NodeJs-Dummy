const path = require('path');
const date = require('date-and-time');

const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const CATEGORY = "DHEERAJ";

//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${date.format(new Date(), "YYYY-MM-DD HH:mm:ss")} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: "debug",
    format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
    transports: [
        new transports.Console(),
        // new transports.File({ filename: path.join(__dirname, './logs', 'dheeraj-error.log'), level: 'error' }),
    ],
});

module.exports = logger;



























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

