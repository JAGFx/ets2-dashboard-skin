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

const options      = { /* ... */ };
const io           = socketio( options );
const dateFilename = path.resolve( process.cwd(), '../src/data/scs_sdk_plugin_parsed_data.json' );
const port         = 3000;

io.listen( port, () => {
	const url       = `localhost:${ port }`;
	const data      = {
		url:  url,
		port: port
	};
	const eventName = 'server.listen';
	const txt       = `Euro Truck Simulator 2 dashboard is running at http://${ url }/`;
	io.emit( 'log', {
		eventName: eventName,
		rawData:   data
	} );
	console.log( `[${ eventName }] ${ txt }` );
} );

io.on( 'connection', socket => {
	const data = fs.readFileSync( dateFilename );
	io.emit( 'update', JSON.parse( data.toString() ) );
	console.log( 'Update' );
} );
