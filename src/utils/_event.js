import scsSDKData from '@/data/scs_sdk_plugin_parsed_data.json';
import _app       from '@/utils/_app';

/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_event.js
 * Date: 	14/07/2020
 * Time: 	11:17
 */

const EVT_UPDATE = 'evt-update';

const eventNameToComponent = function ( eventName ) {
	const splitedEvent = eventName.split( '.' );
	let finalStr       = 'EventOverlay';
	
	splitedEvent.forEach( ( elm ) => {
		finalStr += elm.charAt( 0 ).toUpperCase() + elm.slice( 1 );
	} );
	
	//console.log( finalStr );
	return finalStr;
};

const filterInputEvent = function ( event ) {
	const eventName   = event.eventName;
	const spitedEvent = eventName.split( '.' );
	const eventToSkip = [
		'truck.warning',
		'truck.cruise-control',
		'truck.refuel'
	];
	const rawData     = (_app.isOnDevEnvironment)
		? scsSDKData.events[ spitedEvent[ 0 ] ][ spitedEvent[ 1 ] ]
		: event.rawData;
	let eventSkipped  = false;
	
	if ( eventToSkip.indexOf( eventName ) !== -1
		 || (eventName === 'truck.cruise-control-decrease' && !rawData.cruiseControl.enabled)
	)
		eventSkipped = true;
	
	// TODO Add custom message with value on the raw data
	
	return (eventSkipped)
		? false
		: event;
};

export default {
	EVT_UPDATE,
	eventNameToComponent,
	filterInputEvent
};
