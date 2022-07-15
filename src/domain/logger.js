import { DateTime } from 'luxon';

export const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL'
};

export const createLine = (message, zone, level = LOG_LEVEL.INFO) => {
  const date = DateTime.now();
  return `[ ${date.toString()} ][ ${level} ][ ${zone} ] ${message}`;
};
