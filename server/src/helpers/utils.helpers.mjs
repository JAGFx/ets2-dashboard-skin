/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	utils.helpers.js
 * Date: 	26-Apr-20
 * Time: 	15:54
 */

import { io, telemetry } from './server.helpers';


const logIt = ( eventName, rawData, txt ) => {
	io.emit( 'log', {
		eventName: eventName,
		rawData:   rawData
	} );
	console.log( `[${ eventName }] ${ txt }` );
};

const currency = () => {
	const alts = [ '?', '€', '$' ];
	return alts[ telemetry.getGame().game.id || 0 ];
};

export {
	logIt,
	currency
};

export default {};

