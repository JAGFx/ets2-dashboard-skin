/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	app.plugin.js
 * Date: 	14/08/2021
 * Time: 	19:43
 */

import { event, history } from '@/utils/utils';
import store              from '@/store';
import { io }             from 'socket.io-client';

export default {
	install( Vue ) {
		Vue.prototype.$pushALog = ( message, zone, level = history.HTY_LEVEL.INFO ) => {
			store.dispatch( 'debug/addLog', {
				message,
				zone,
				level
			} );
		};
		
		Vue.prototype.$updateEvent = data => {
			const theEvent = event.filterInputEvent( data );
			
			if ( theEvent !== false ) {
				const configName = `events_${ theEvent.eventName }`;
				const isActive   = store.getters[ 'config/get' ]( configName );
				
				if ( isActive ) {
					Vue.prototype.$pushALog( 'New event ' + JSON.stringify( theEvent ), history.HTY_ZONE.MAIN );
				}
				
				store.dispatch( 'event/displayEnEvent', {
					eventProcessing: true,
					eventName:       theEvent.eventName,
					eventRawData:    theEvent.rawData
				} );
			}
		};
		
		
		const telemetrySocket = io( 'http://' + window.location.hostname + ':3000' );
		telemetrySocket.on( 'connect', () => {
			store.dispatch( 'telemetry/socket_connect' );
		} );
		telemetrySocket.on( 'update', data => {
			store.dispatch( 'telemetry/socket_update', data );
		} );
		telemetrySocket.on( 'log', data => {
			Vue.prototype.$updateEvent( data );
		} );
		
		Vue.prototype.$telemetrySocket = telemetrySocket;
	}
};