import {
  initApp,
  initConfig,
  initMap,
  initServer,
  initSocket
} from 'ets2-dashboard-lib/server.js';
import store, { app, isDevelopment, socket } from 'ets2-dashboard-lib/store.js';
import { telemetryWatch } from 'ets2-dashboard-lib/telemetry.js';
import { catchError } from 'ets2-dashboard-lib/utils.js';
import express from 'express';
import path from 'path';
import truckSimTelemetry from 'trucksim-telemetry';
import gameEvent from './events/game.event.js';
import jobEvent from './events/job.event.js';
import navigationEvent from './events/navigation.event.js';
import trailersEvent from './events/trailers.event.js';

const libPath = path.resolve('../../lib');
const distAppFolder = path.resolve('../../dist');
const telemetry = truckSimTelemetry();

store.set('libPath', libPath);

initApp()
  .then(initConfig)
  .then(initSocket)
  .then(initServer)
  .then(initMap)
  .then(() => {
    telemetryWatch(socket, telemetry);
  })
  .then(() => {
    gameEvent(telemetry);
    jobEvent(telemetry);
    navigationEvent(telemetry);
    trailersEvent(telemetry);
  })
  .then(() => {
    app.use(express.static(distAppFolder));
    const environment = isDevelopment() ? 'Development' : 'Production';
    console.log(`Ready as ${environment}`);
  })
  .catch(catchError);
