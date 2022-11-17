import { DateTime } from 'luxon/src/datetime';

import { LogLevel } from '@core/application/logger.type';

export const createLine = (
  message: string,
  zone: string,
  level: LogLevel = LogLevel.INFO
): string => {
  const date = DateTime.now();
  return `[ ${date.toString()} ][ ${level} ][ ${zone} ] ${message}`;
};
