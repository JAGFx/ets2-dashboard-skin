/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	index.js
 * Date: 	16/11/2021
 * Time: 	20:18
 */
import { initLogger } from 'ets2-dashboard-lib/logger.js';
import {
  initApp,
  initConfig,
  initMap,
  initServer,
  initSocket
} from 'ets2-dashboard-lib/server.js';
import store, { logger } from 'ets2-dashboard-lib/store.js';
import { catchError } from 'ets2-dashboard-lib/utils.js';
import path from 'path';

const libPath = path.resolve('../../lib');
store.set('libPath', libPath);

process.env.NODE_ENV = 'development';
initApp()
  .then(initLogger)
  .then(initConfig)
  .then(initSocket)
  .then(initServer)
  .then(initMap)
  .then(() => {
    logger.info('Initialized');
  })
  .catch(catchError);
