/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	navigation.events.mjs
 * Date: 	26-Apr-20
 * Time: 	17:17
 */

import { telemetry } from '../helpers/server.helpers';
import { logIt }     from '../helpers/utils.helpers';

const log = ( eventName, rawData, text ) => {
	text = 'Navigation | ' + text;
	logIt( 'navigation.' + eventName, rawData, text );
};

const eventNames = {
	speedLimit: 'speed-limit'
};

export default () => {
	telemetry.navigation.on( eventNames.speedLimit,
		( speed ) => {
			const text = `Speed limit changed to ${ speed.kph }kph / ${ speed.mph }mph`;
			const data = {
				speed: speed
			};
			
			log( eventNames.speedLimit, data, text );
		}
	);
};
