/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	event.plugin.js
 * Date: 	17/10/2020
 * Time: 	11:32
 */

import { EventBus } from '@/event-bus';
import store        from '@/store';
import _event       from '@/utils/_event';

export default {
	store,
	install( Vue, options ) {
		console.log( 'Events plugin' );
		
		// --- Update telemetry data
		
		Vue.prototype.$updateEvent = ( log ) => {
			const event = _event.filterInputEvent( log );
			
			if ( event !== false ) {
				const configName = `events_${ event.eventName }`;
				const isActive   = store.getters[ 'config/get' ]( configName );
				
				if ( isActive ) {
					EventBus.$emit( _event.EVT_UPDATE, {
						eventProcessing: true,
						eventName:       event.eventName,
						eventRawData:    event.rawData
					} );
					
				}
			}
		};
	}
};
