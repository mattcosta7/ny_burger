const path = require('path');
const fs = require('fs');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { NODE_ENV, PRODUCTION_ENV } = require('../../config');

const logDirectory = path.join(__dirname, '..', '..', 'log');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const FileLogger = new DailyRotateFile({
  level: 'info',
  filename: `${logDirectory}/log`,
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  handleExceptions: true,
  json: true,
  maxsize: 5242880,
  maxFiles: 5,
  colorize: true,
});

const ConsoleLogger = new winston.transports.Console({
  level: 'debug',
  handleExceptions: true,
  json: false,
  colorize: true,
});

// const LogglyLogger = new winston.transports.Loggly({
//   token: LOGGLY_TOKEN,
//   subdomain: '',
//   tags: ['Winston-NodeJS', NODE_ENV || 'development'],
//   json: true,
// });

const logger = new winston.Logger({
  transports: [ConsoleLogger],
});

// if (NODE_ENV === PRODUCTION_ENV) {
//   logger.transports.push(FileLogger);
// }

logger.stream = {
  write: (message, encoding) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
