/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	telemetry.js
 * Date: 	16/11/2021
 * Time: 	21:45
 */
import { gameConfig } from './config.js';
import store from './store.js';

export const telemetryInterval = () => {
  const config = store.get('config.app');
  return Object.hasOwnProperty.call(config, 'general_refresh_rate')
    ? Math.min(parseInt(config.general_refresh_rate), 100)
    : 100;
};

export const telemetryWatch = (socket, telemetry) => {
  telemetry.watch({ interval: telemetryInterval() }, (data) => {
    store.set('telemetry', data);
    store.set('config.game', JSON.parse(gameConfig(data.game.game.name)));
    socket.emit('update', data);
  });
};
