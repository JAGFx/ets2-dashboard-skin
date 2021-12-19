/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	index.js
 * Date: 	16/11/2021
 * Time: 	20:18
 */

import {
  initApp,
  initConfig,
  initMap,
  initServer,
  initSocket
} from 'ets2-dashboard-lib/server.js';
import { catchError } from 'ets2-dashboard-lib/utils.js';
import path from 'path';

const libPath = path.resolve('../../lib');

process.env.NODE_ENV = 'development';
initApp()
  .then(() => initConfig(libPath))
  .then(initSocket)
  .then(initServer)
  .then(() => initMap(libPath))
  .then(() => {
    console.log('Initialized');
  })
  .catch(catchError);
