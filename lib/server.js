/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	server.utils.js
 * Date: 	16/11/2021
 * Time: 	20:39
 */

import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import {
  gameConfig,
  initAppConfig,
  saveAppConfig,
  saveGameConfig
} from './config.js';
import store, { app, isDevelopment, logger, server, socket } from './store.js';
import { telemetryInterval } from './telemetry.js';
import { catchError, logIt } from './utils.js';
import sdkData from 'ets2-dashboard-lib/sdk/scs_sdk_plugin_parsed_data.json';

const postConfigRequest = (req, res) => {
  saveAppConfig(req.body.data);
  saveGameConfig(req.params.target, req.body.gameId);

  res.send(req.body);
};

const getConfigRequest = (req, res) => {
  res.send(store.get('config'));
};

export const initApp = () => {
  return new Promise((resolve) => {
    app.use(bodyParser.json());
    app.use(cors());

    resolve();
  });
};

export const initConfig = () => {
  return new Promise((resolve) => {
    initAppConfig()
      .then(() => {
        app.post('/config/:target', postConfigRequest);
        app.get('/config', getConfigRequest);

        const config = store.get('config.app');
        const port = Object.hasOwnProperty.call(config, 'general_port')
          ? parseInt(config.general_port)
          : 3000;

        store.set('port', port);

        resolve();
      })
      .catch(catchError);
  });
};

export const initMap = () => {
  return new Promise((resolve) => {
    const basePath = store.get('libPath');
    const pathMap = path.resolve(basePath, './maps');
    if (fs.existsSync(pathMap)) app.use('/maps', express.static(pathMap));

    resolve();
  });
};

export const initSocket = () => {
  return new Promise((resolve) => {
    socket.on('connection', (socket) => {
      logger.info('User connection', { socketId: socket.id });

      if (isDevelopment()) {
        //const dataFileName = path.resolve(
        //  process.cwd(),
        //  '../../src/data/scs_sdk_plugin_parsed_data.json'
        //);
        //const data = JSON.parse(fs.readFileSync(dataFileName).toString());
        let lastGameName = null;

        setInterval(() => {
          socket.emit('update', sdkData);
          const currentGameName = sdkData.game.game.name;

          if (currentGameName !== lastGameName) {
            const config = JSON.parse(gameConfig(currentGameName));
            store.set('config.game', config);
          }

          lastGameName = currentGameName;
        }, telemetryInterval());
      }
    });
    resolve();
  });
};

export const initServer = () => {
  return new Promise((resolve) => {
    const port = store.get('port');

    app.use((error, req, res) => {
      logger.error(error.message);
      logger.verbose(error.stack);

      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message
        }
      });
    });
    server.listen(port, () => {
      const url = `localhost:${port}`;
      const data = {
        url: url,
        port: port
      };

      logIt(
        'server.listen',
        data,
        `Euro Truck Simulator 2 dashboard is running at http://${url}/`
      );
      resolve();
    });
  });
};

export default {};
