//region Import libraries
const {
  createLogger,
  transports,
  format: { printf, combine, timestamp, label },
} = require('winston');
const { format } = require('date-fns');
const path = require('path');
//endregion

const specialFormat = printf(
  info => `${format(info.timestamp, 'HH:mm DD.MM.YYYY')} ${info.level}: ${info.message}`
);

//region Create logger
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Hello world!' }), timestamp(), specialFormat),
  transports: [
    new transports.File({ filename: path.resolve('logs', 'error.log'), level: 'error' }),
    new transports.File({ filename: path.resolve('logs', 'combined.log') }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      colorize: true,
      level: 'debug',
    })
  );
}
//endregion

//region Export
module.exports = logger;
//endregion
