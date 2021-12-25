import store, { logger, socket } from './store.js';

export const logIt = (eventName, rawData, txt) => {
  socket.emit('log', {
    eventName: eventName,
    rawData: rawData
  });
  logger.info('[%s] %s', eventName, txt);
};

export const currency = () => {
  const alts = ['?', '€', '$'];
  return alts[store.get('telemetry.game.id') || 0];
};

export const catchError = (error) => {
  logger.error(error.message || error, error.metadata ?? {});
};
