import { initApp, initConfig, initMap, initServer, initSocket } from 'ets2-dashboard-lib/server.js';
import { socket }                                               from 'ets2-dashboard-lib/store.js';
import { telemetryWatch }                                       from 'ets2-dashboard-lib/telemetry.js';
import { catchError }                                           from 'ets2-dashboard-lib/utils.js';
import path                                                     from 'path';
import truckSimTelemetry                                        from 'trucksim-telemetry';
import gameEvent                                                from './events/game.event.js';
import jobEvent                                                 from './events/job.event.js';
import navigationEvent                                          from './events/navigation.event.js';
import trailersEvent                                            from './events/trailers.event.js';

const libPath = path.resolve('../../lib');
const telemetry = truckSimTelemetry();

//process.env.NODE_ENV = 'development';
initApp()
	.then( () => initConfig( libPath ) )
	.then( initSocket )
	.then( initServer )
	.then( () => initMap( libPath ) )
	.then( () => {
		telemetryWatch(  socket, telemetry );
	} )
	.then( () => {
		gameEvent(telemetry)
		jobEvent(telemetry)
		navigationEvent(telemetry)
		trailersEvent(telemetry)
	} )
	.then( () => {
		console.log( 'Initialized' );
	} )
	.catch( catchError )