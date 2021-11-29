/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	telemetry.service.js
 * Date: 	18/10/2021
 * Time: 	20:09
 */

//import { config, gameConfig } from '../utils/config.util';
//
//export const telemetryInterval  = () => {
//	return (config.app.hasOwnProperty( 'general_refresh_rate' ))
//		? Math.min( parseInt( config.app.general_refresh_rate ), 100 )
//		: 100;
//};
//
//export const telemetryWatch = (io, telemetry) => {
//	telemetry.watch( { interval: telemetryInterval }, data => {
//		if ( config.game === null && data.game.game.name !== undefined )
//			config.game = gameConfig( data.game.game.name );
//
//		io.emit( 'update', data );
//	} );
//}