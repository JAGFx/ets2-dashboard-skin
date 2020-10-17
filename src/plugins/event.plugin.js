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
		
		// TODO Get default data form scs sdk file
		const EVT_UPDATE  = 'evt-update';
		const defaultData = {
			eventProcessing: false,
			eventName:       null,
			eventRawData:    {
				'game': {
					'fine': {
						'active':  true,
						'amount':  1000,
						'offence': { 'id': 'speeding', 'name': 'Speeding' }
					}
				}
			}
		};
		
		// --- Update telemetry data
		
		Vue.prototype.$updateEvent = ( log ) => {
			const event = _event.filterInputEvent( log );
			
			if ( event !== false ) {
				const configName = `events_${ event.eventName }`;
				const isActive   = store.getters[ 'config/get' ]( configName );
				
				if ( isActive ) {
					EventBus.$emit( EVT_UPDATE, {
						eventProcessing: true,
						eventName:       event.eventName,
						eventRawData:    event.rawData
					} );
					/*setTimeout( () => {
					 this.$stopEvent();
					 }, 3000 );*/
				}
			}
		};
		
		Vue.prototype.$stopEvent = () => {
			EventBus.$emit( EVT_UPDATE, defaultData );
		};
		
		Vue.mixin( {
			data() {
				return defaultData;
			},
			created() {
				EventBus.$on( EVT_UPDATE, dataIn => {
					console.log( 'Plop', Object.assign( {}, this.eventRawData, dataIn.eventRawData ) );
					this.eventProcessing = dataIn.eventProcessing;
					this.eventName       = dataIn.eventName;
					this.eventRawData    = Object.assign( {}, this.eventRawData, dataIn.eventRawData );
				} );
			}
		} );
	}
};
