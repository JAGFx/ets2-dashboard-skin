/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	store.js
 * Date: 	16/11/2021
 * Time: 	20:29
 */
import { Store } from 'data-store';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { appConfig } from './config.js';

const store = new Store('myStore');

export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const initAppConfig = (basePath = null) => {
  return new Promise((resolve) => {
    store.set('config', {
      app: JSON.parse(appConfig(basePath)),
      game: null
    });
    resolve();
  });
};

export const app = express();
export const server = http.createServer(app);
export const socket = new Server(server, {
  cors: {
    origin: /http:\/\/localhost:\d+/
    //credentials: true
  }
});

export default store;
