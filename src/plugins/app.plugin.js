/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	app.plugin.js
 * Date: 	14/08/2021
 * Time: 	19:43
 */

import store                   from '@/store';
import { mutations }           from '@/store/telemetry.store';
import { translate }           from '@/utils/_i18n';
import { app, event, history } from '@/utils/utils';
import { io }                  from 'socket.io-client';
import testData                from '@/data/scs_sdk_plugin_parsed_data.json';


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
				const isActive   = store.getters[ 'config/enabled' ]( configName );
				
				if ( isActive ) {
					Vue.prototype.$pushALog( 'New event ' + JSON.stringify( theEvent ), history.HTY_ZONE.MAIN );
				
					store.dispatch( 'event/displayAnEvent', {
						eventProcessing: true,
						eventName:       theEvent.eventName,
						eventRawData:    theEvent.rawData
					} );
				}
			}
		};
		
		const updateTelemetry = payload => {
			const data = { ...payload };
			Object.freeze( data );
			const gameConnected = data.game !== null &&
								  (typeof data.game === 'object' && Object.keys( data.game ).length > 0);
			
			mutations.setTelemetry( data );
			mutations.setGameConnected( gameConnected );
			
			if ( gameConnected )
				mutations.setReceivedData( true );
		}
		
		// --- Dev
		if ( app.useFakeData )
			setTimeout( () => {
				updateTelemetry( testData )
			}, 1000 );
		// --- ./Dev
		
		else {
			const telemetrySocket = io( 'http://' + window.location.hostname + ':3000' );
			telemetrySocket.on( 'connect', () => {
				store.commit( 'app/setLaunch', {
					icon:    '<i class="fas fa-truck"></i>',
					text:    'Connected to telemetry server',
					subText: 'Ready to delivering'
				} );
				
				setTimeout( () => {
					store.commit( 'app/setLaunch', {
						icon:    '<i class="fas fa-truck"></i>',
						text:    'Waiting game connection',
						subText: 'Run the game to start your job !'
					} );
				}, 5000 );
			} );
			telemetrySocket.on( 'update', updateTelemetry);
			telemetrySocket.on( 'log', data => {
				Vue.prototype.$updateEvent( data );
			} );
		}
		
		// ---
		
		Vue.prototype.$t = translate;
	}
};