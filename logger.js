/**
 * Module for logging messages using the Winston library.
 * Provides separate loggers for different log levels (info, debug, error).
 * Logs messages to the console and to log files in JSON format.
 * @module logger
 */

import winston from 'winston';

/**
 * Logger for logging informational messages.
 * Logs messages with level 'info' to the console and to the 'info.log' file.
 * @type {winston.Logger}
 */
const infoLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/info.log' })
    ]
});

/**
 * Logger for logging debug messages.
 * Logs messages with level 'debug' to the console and to the 'debug.log' file.
 * @type {winston.Logger}
 */
const debugLogger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/debug.log' })
    ]
});

/**
 * Logger for logging error messages.
 * Logs messages with level 'error' to the console and to the 'error.log' file.
 * @type {winston.Logger}
 */
const errorLogger = winston.createLogger({
    level: 'error',
    format: 'error',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/error.log' })
    ]
});

export { infoLogger, debugLogger, errorLogger };
