/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	server.helpers.js
 * Date: 	26-Apr-20
 * Time: 	15:56
 */

import express           from 'express';
import http              from 'http';
import path              from 'path';
import socketio          from 'socket.io';
import truckSimTelemetry from 'trucksim-telemetry';
import { logIt }         from './utils.helpers';

let app, server, io, telemetry, port, interval, pathDist;


const init = () => {
	app       = express();
	server    = http.createServer( app );
	io        = socketio( server );
	telemetry = truckSimTelemetry();
	port      = 3000;
	interval  = 15;
	pathDist  = path.resolve( __dirname, '../../../dist' );
	
	app.use( express.static( pathDist ) );
	
	telemetry.watch( { interval: interval }, function ( data ) {
		io.emit( 'update', data );
	} );
	
	io.on( 'connection', function ( socket ) {
		io.emit( 'update', telemetry.data );
	} );
	
	server.listen( port, function () {
		const url  = `localhost:${ port }`;
		const data = {
			url:  url,
			port: port
		};
		
		logIt( 'server.listen', data, `Euro Truck Simulator 2 dashboard is running at http://${ url }/` );
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
