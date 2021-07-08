/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	event.plugin.js
 * Date: 	17/10/2020
 * Time: 	11:32
 */

import { EventBus }       from '@/event-bus';
import store              from '@/store';
import { event, history } from '@/utils/utils';

export default {
	store,
	install( Vue, options ) {
		console.log( 'Events plugin' );
		
		// --- Update telemetry data
		
		Vue.prototype.$updateEvent = ( log ) => {
			const event = event.filterInputEvent( log );
			
			if ( event !== false ) {
				const configName = `events_${ event.eventName }`;
				const isActive   = store.getters[ 'config/get' ]( configName );
				
				if ( isActive ) {
					Vue.prototype.$pushALog( 'New event ' + JSON.stringify( event ), history.HTY_ZONE.MAIN );
					EventBus.$emit( event.EVT_UPDATE, {
						eventProcessing: true,
						eventName:       event.eventName,
						eventRawData:    event.rawData
					} );
				}
			}
		};
	}
};
