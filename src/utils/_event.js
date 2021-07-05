/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_event.js
 * Date: 	14/07/2020
 * Time: 	11:17
 */

import scsSDKData from '@/data/scs_sdk_plugin_parsed_data.json';
import _app       from '@/utils/_app';

const EVT_UPDATE = 'evt-update';

const eventNameToComponent = function ( eventName ) {
	const splitedEvent = eventName.split( /\.|-/ );
	let finalStr       = 'TelemetryEvent';
	
	splitedEvent.forEach( ( elm ) => {
		finalStr += elm.charAt( 0 ).toUpperCase() + elm.slice( 1 );
	} );
	
	finalStr += 'Overlay';
	
	return finalStr;
};

const filterInputEvent = function ( event ) {
	const eventName    = event.eventName;
	const splicedEvent = eventName.split( '.' );
	const eventToSkip  = [
		'truck.cruise-control',
		'truck.refuel'
	];
	
	const rawData    = (_app.isOnDevEnvironment)
		? scsSDKData.events[ splicedEvent[ 0 ] ][ splicedEvent[ 1 ] ]
		: event.rawData;
	let eventSkipped = false;
	
	if ( eventToSkip.indexOf( eventName ) !== -1
		 || (eventName
			 === 'truck.cruise-control-decrease'
			 && !rawData[ 'cruise-control-decrease' ].cruiseControl.enabled)
		 || (eventName === 'navigation.speed-limit' && rawData[ 'speed-limit' ].speed.value === 0)
	)
		eventSkipped = true;
	
	return (eventSkipped)
		? false
		: event;
};

export default {
	EVT_UPDATE,
	eventNameToComponent,
	filterInputEvent
};
