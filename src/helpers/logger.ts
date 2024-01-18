import winston from 'winston';

const options = {
  file: {
    filename: './logs/errors.log',
    level: 'error',
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
  },
  console: {
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    handleExceptions: true,
  },
};

export const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [new winston.transports.File(options.file)],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(options.console));
}

export const loggerInfoWithStep = (step: number) => (message: string) =>
  logger.info(`STEP [${step}]: ${message}`);

export const loggerInfoSaltoks = (data: string) => (message: string) =>
  logger.info(`Data ${data} returns error ${message}`);

export const loggerInfoHttp = (data: string) => (message: string) =>
  logger.info(`Data ${data} returns error ${message}`);
