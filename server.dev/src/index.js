/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	index.js
 * Date: 	08/10/2020
 * Time: 	20:02
 */

const path     = require( 'path' );
const fs       = require( 'fs' );
const socketio = require( 'socket.io' );

const express               = require( 'express' );
const http                  = require( 'http' );
const bodyParser            = require( 'body-parser' );
const { telemetryInterval } = require( './services/telemetry.service' );
const { initConfig }        = require( './services/config.service' );
const dateFilename          = path.resolve( process.cwd(), '../src/data/scs_sdk_plugin_parsed_data.json' );
const port                  = 3000;
// ---

let app    = express();
let server = http.createServer( app );
const io        = socketio( server, {
	cors: {
		origin:      /http:\/\/localhost:\d+/,
		credentials: true
	}
} );

app.use( bodyParser.json() );
app.use( '/maps', express.static( path.resolve( __dirname, '../../maps' ) ) );

// ---
initConfig( app, __dirname );

io.on( 'connection', socket => {
	const data = fs.readFileSync( dateFilename );
	console.log( 'Connection: ' + socket.id );
	setInterval( () => {
		socket.emit( 'update', JSON.parse( data.toString() ))
	}, telemetryInterval() );
} );

server.listen( port, () => {
	const url  = `localhost:${ port }`;
	const data = {
		url:  url,
		port: port
	};
	
	console.log( 'server.listen', data, `Euro Truck Simulator 2 dashboard is running at http://${ url }:${port}/` );
} );