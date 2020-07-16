/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_event.js
 * Date: 	14/07/2020
 * Time: 	11:17
 */

const eventNameToComponent = function ( eventName ) {
	const splitedEvent = eventName.split( '.' );
	let finalStr       = 'EventOverlay';
	
	splitedEvent.forEach( ( elm ) => {
		finalStr += elm.charAt( 0 ).toUpperCase() + elm.slice( 1 );
	} );
	
	//console.log( finalStr );
	return finalStr;
};

export default {
	eventNameToComponent
};
