/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	store.js
 * Date: 	16/11/2021
 * Time: 	20:29
 */
import { Store }     from 'data-store';
import express       from 'express';
import http          from 'http';
import { Server }    from 'socket.io';
import { appConfig } from './config.js';

const store = new Store("myStore")
store.set( 'config', {
	app: JSON.parse( appConfig() ),
	game: null
} );
//store.set('port', 3000)

export const isDevelopment = () => process.env.NODE_ENV === 'development';

export const app    = express();
export const  server = http.createServer( app );
export const socket =  new Server( server, {
	cors: {
		origin:      /http:\/\/localhost:\d+/,
		//credentials: true
	}
} );

export default store;