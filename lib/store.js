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
import winston from 'winston';

const store = new Store('myStore');

export const isDevelopment = () => process.pkg === undefined;

export const app = express();
export const server = http.createServer(app);
export const socket = new Server(server, {
  cors: {
    origin: /http:\/\/localhost:\d+/
    //credentials: true
  }
});
export const logger = winston.createLogger();

export default store;
