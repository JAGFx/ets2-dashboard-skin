import { logIt } from 'ets2-dashboard-lib/utils.js';

const log = (eventName, rawData, text) => {
  text = 'Trailers | ' + text;
  logIt('trailers.' + eventName, rawData, text);
};

const eventNames = {
  coupling: 'coupling',
  damage: 'damage'
};

export default (telemetry) => {
  telemetry.trailers.on('coupling', (id, enabled) => {
    const text = `Trailer #${id + 1} coupling ${
      enabled ? 'connected' : 'disconnected'
    }`;
    const data = {
      id: id,
      enabled: enabled
    };

    log(eventNames.coupling, data, text);
  });
  telemetry.trailers.on('damage', (id, damages) => {
    const text = `Trailer #${id + 1} damage increased ${(
      100 * damages.chassis
    ).toFixed()}%`;
    const data = {
      id: id,
      data: damages
    };

    log(eventNames.damage, data, text);
  });
};
