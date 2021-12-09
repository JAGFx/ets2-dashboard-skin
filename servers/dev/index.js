/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	index.js
 * Date: 	16/11/2021
 * Time: 	20:18
 */


import { initApp, initConfig, initServer, initSocket } from 'ets2-dashboard-lib/server.js';
import path     from 'path';

const dirname = path.resolve();

initApp();
initConfig( dirname );
initSocket();
initServer();

// TODO: Add a timeout to send telemetry data for dev serveur
