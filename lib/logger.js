import path from 'path';
import winston from 'winston';

import { logger } from './store.js';

export const initLogger = () => {
  return new Promise((resolve) => {
    //if (fs.existsSync(logFileName)) fs.unlinkSync(logFileName);

    logger.configure({
      exitOnError: false,
      transports
    });

    resolve();
  });
};

export const logFileName = path.resolve(process.cwd(), 'logs/server.log');
export const loggerFormat = winston.format.printf(
  ({ level, message, timestamp, metadata }) => {
    return `${timestamp} | ${level.toUpperCase()} | ${message} | ${JSON.stringify(
      metadata
    )}`;
  }
);

export const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize(),
      winston.format.simple()
    ),
    handleExceptions: true,
    handleRejections: true
  }),
  new winston.transports.File({
    filename: logFileName,
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.metadata(),
      winston.format.timestamp(),
      loggerFormat
    ),
    handleExceptions: true,
    handleRejections: true
  })
];
