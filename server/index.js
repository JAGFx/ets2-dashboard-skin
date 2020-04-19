import express           from 'express';
import http              from 'http';
import path              from 'path';
import socketio          from 'socket.io';
import truckSimTelemetry from 'trucksim-telemetry';
import pkgDash           from '../package.json';

const app       = express();
const server    = http.createServer( app );
const io        = socketio( server );
const telemetry = truckSimTelemetry();

app.use( express.static( path.resolve( __dirname, '../../dist' ) ) );

const log = [];

const logIt = ( txt ) => {
	log.push( { timestamp: Date.now(), txt } );
	io.emit( 'log', log );
};

const currency = () => {
	const alts = [ '?', '€', '$' ];
	return alts[ telemetry.getGame().game.id || 0 ];
};

telemetry.game.on( 'connected', () => logIt( 'Connected' ) );
telemetry.game.on( 'disconnected', () => logIt( 'Disconnected' ) );
telemetry.game.on( 'pause', ( paused ) => logIt( paused ? 'Paused' : 'Unpaused' ) );
telemetry.game.on( 'fine',
	( fine ) => logIt( `${ fine.offence.name }, ${ currency() }${ fine.amount.toLocaleString() } fine` ) );
telemetry.game.on( 'tollgate',
	( tollgate ) => logIt( `Toll paid ${ currency() }${ tollgate.amount.toLocaleString() }` ) );
telemetry.game.on( 'ferry', ( ferry ) => logIt( `Ferry (${ ferry.source.name } -> ${ ferry.target.name })` ) );
telemetry.game.on( 'train', ( train ) => logIt( `Train (${ train.source.name } -> ${ train.target.name })` ) );
telemetry.game.on( 'refuel-payed', () => logIt( `Refueling payed` ) );

telemetry.job.on( 'cancelled',
	( data ) => logIt( `Job cancelled, Penalty: ${ currency() }${ data.penalty.toLocaleString() }` ) );
telemetry.job.on( 'delivered',
	( data ) => logIt( `Job delivered, ${ currency() }${ data.revenue.toLocaleString() } / ${ data.earnedXP }XP` ) );
telemetry.job.on( 'finished', ( data ) => logIt( 'Job finished' ) );
telemetry.job.on( 'started', ( data ) => logIt( 'New job started' ) );

telemetry.truck.on( 'cruise-control', ( enabled ) => logIt( `Cruise control ${ enabled ? 'Enabled' : 'Disabled' }` ) );
telemetry.truck.on( 'cruise-control-increase',
	( data ) => logIt( `Cruise control increased to ${ data.kph }kph / ${ data.mph }mph` ) );
telemetry.truck.on( 'cruise-control-decrease',
	( data ) => logIt( `Cruise control decreased to ${ data.kph }kph / ${ data.mph }mph` ) );
telemetry.truck.on( 'warning',
	( warning, enabled ) => logIt( enabled ? `Warning: ${ warning }` : `${ warning } warning disabled` ) );
telemetry.truck.on( 'emergency',
	( emergency, enabled ) => logIt( enabled ? `Emergency: ${ emergency }` : `${ emergency } emergency disabled` ) );
telemetry.truck.on( 'electric', ( enabled ) => logIt( `Truck electrical ${ enabled ? 'ON' : 'OFF' }` ) );
telemetry.truck.on( 'engine', ( enabled ) => logIt( `Truck engine ${ enabled ? 'ON' : 'OFF' }` ) );
telemetry.truck.on( 'park', ( enabled ) => logIt( `Parking brake ${ enabled ? 'ON' : 'OFF' }` ) );
telemetry.truck.on( 'damage', ( data ) => logIt( `Truck damage increased ${ (100 * data.chassis).toFixed() }%` ) );
telemetry.truck.on( 'refuel', ( curr, prev ) => logIt( `Truck refueled from ${ prev.amount } to ${ curr.amount }` ) );

telemetry.trailers.on( 'coupling',
	( id, enabled ) => logIt( `Trailer #${ id + 1 } coupling ${ enabled ? 'connected' : 'disconnected' }` ) );
telemetry.trailers.on( 'damage',
	( id, data ) => logIt( `Trailer #${ id + 1 } damage increased ${ (100 * data.chassis).toFixed() }%` ) );

telemetry.navigation.on( 'speed-limit',
	( data ) => logIt( `Speed limit changed to ${ data.kph }kph / ${ data.mph }mph` ) );

telemetry.watch( { interval: 15 }, function ( data ) {
	io.emit( 'update', data );
} );

io.on( 'connection', function ( socket ) {
	io.emit( 'update', telemetry.data );
	io.emit( 'log', log );
} );

server.listen( 3000, function () {
	console.log( `${ pkgDash.description } is running at http://localhost:3000/` );
} );
