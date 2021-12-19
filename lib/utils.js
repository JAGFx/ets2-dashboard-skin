import store, { socket } from './store.js';

export const logIt = ( eventName, rawData, txt ) => {
	socket.emit( 'log', {
		eventName: eventName,
		rawData:   rawData
	} );
	console.log( `[${ eventName }] ${ txt }`/*, JSON.stringify( rawData, null, 2 )*/ );
};

export const currency = () => {
	const alts = [ '?', '€', '$' ];
	return alts[ store.get( 'telemetry.game.id' ) || 0 ];
};

export const catchError = (error) => {
	console.error( "ERROR > " + (error.message || error) );
	console.error( '---' );
	console.error( error );
}