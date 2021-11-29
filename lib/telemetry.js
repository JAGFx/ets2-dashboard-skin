/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	telemetry.js
 * Date: 	16/11/2021
 * Time: 	21:45
 */

import { gameConfig } from './config.js';
import store          from './store.js';

export const telemetryInterval = () => {
	const config = store.get('config')
	return (config.app.hasOwnProperty( 'general_refresh_rate' ))
		? Math.min( parseInt( config.app.general_refresh_rate ), 100 )
		: 100;
};

export const telemetryWatch = (io, telemetry) => {
	const config = store.get('config')
	telemetry.watch( { interval: telemetryInterval }, data => {
		if ( config.game === null && data.game.game.name !== undefined )
			config.game = gameConfig( data.game.game.name );
		
		io.emit( 'update', data );
	} );
}