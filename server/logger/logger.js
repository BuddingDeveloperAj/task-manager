const winston = require('winston');

// Define log formats
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
    level: 'info', // Minimum level to log
    format: logFormat,
    transports: [
        // Log errors to error.log
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: logFormat,
        }),
        // Log all levels to combined.log
        new winston.transports.File({
            filename: 'combined.log',
            format: logFormat,
        }),
        // Log to console for development/debugging
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

module.exports = logger;
