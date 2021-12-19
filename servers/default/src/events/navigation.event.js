import { logIt } from 'ets2-dashboard-lib/utils.js';

const log = (eventName, rawData, text) => {
  text = 'Navigation | ' + text;
  logIt('navigation.' + eventName, rawData, text);
};

const eventNames = {
  speedLimit: 'speed-limit'
};

export default (telemetry) => {
  telemetry.navigation.on(eventNames.speedLimit, (speed) => {
    const text = `Speed limit changed to ${speed.kph}kph / ${speed.mph}mph`;
    const data = {
      speed: speed
    };

    log(eventNames.speedLimit, data, text);
  });
};
