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
	install( Vue ) {
		// --- Update telemetry data
		
		Vue.prototype.$updateEvent = ( log ) => {
			const theEvent = event.filterInputEvent( log );
			
			if ( theEvent !== false ) {
				const configName = `events_${ theEvent.eventName }`;
				const isActive   = store.getters[ 'config/get' ]( configName );
				
				if ( isActive ) {
					Vue.prototype.$pushALog( 'New event ' + JSON.stringify( theEvent ), history.HTY_ZONE.MAIN );
					EventBus.$emit( event.EVT_UPDATE, {
						eventProcessing: true,
						eventName:       theEvent.eventName,
						eventRawData:    theEvent.rawData
					} );
				}
			}
		};
	}
};
