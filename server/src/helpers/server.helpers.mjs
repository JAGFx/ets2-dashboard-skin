/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	server.helpers.js
 * Date: 	26-Apr-20
 * Time: 	15:56
 */

import bodyParser             from 'body-parser';
import express                from 'express';
import fs                     from 'fs';
import http                   from 'http';
import path                   from 'path';
import socketio               from 'socket.io';
import truckSimTelemetry      from 'trucksim-telemetry';
import { initConfig }                        from '../services/config.service.js';
import { telemetryInterval, telemetryWatch } from '../services/telemetry.service.js';
import { config, gameConfig }                from '../utils/config.util.js';
import { logIt }              from './utils.helpers';

let app, server, io, telemetry, port, pathDist, pathMap;
//const configFilePath = path.resolve( process.cwd(), './config.ets2-dashboard-skin.json' );

const init = () => {
	const config    = JSON.parse( fs.readFileSync( configFilePath, 'UTF-8' ) );
	app       = express();
	server    = http.createServer( app );
	io        = socketio( server, {
		cors: {
			origin:      /http:\/\/localhost:\d+/,
			credentials: true
		}
	} );
	telemetry = truckSimTelemetry();
	port      = (config.hasOwnProperty( 'general_refresh_rate' ))
		? parseInt( config.general_port )
		: 3000;
	interval  = () => {
		const rateFound = config.hasOwnProperty( 'general_refresh_rate' );
		
		return (rateFound)
			? Math.min( parseInt( config.general_refresh_rate ), 100 )
			: 100;
	};
	pathDist  = path.resolve( __dirname, '../../../dist' );
	pathMap   = path.resolve( process.cwd(), './maps' );
	
	app.use( bodyParser.json() );
	app.use( express.static( pathDist ) );
	
	if ( fs.existsSync( pathMap ) )
		app.use( '/maps', express.static( pathMap ) );
	
	initConfig(app);
	
	telemetryWatch( io, telemetry );
	
	io.on( 'connection', socket => {
		socket.emit( 'update', telemetry.data );
	} );
	
	server.listen( port, () => {
		const url  = `localhost:${ port }`;
		const data = {
			url:  url,
			port: port
		};
		
		logIt( 'server.listen', data, `Euro Truck Simulator 2 dashboard is running at http://${ url }:${port}/` );
	} );
};

export {
	app,
	server,
	io,
	telemetry,
	port
};

export default init;
