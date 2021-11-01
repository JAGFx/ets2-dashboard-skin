/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	app.plugin.js
 * Date: 	14/08/2021
 * Time: 	19:43
 */

import store              from '@/store';
import { mutations }      from '@/store/telemetry.store';
import { pushLog }        from '@/utils/_app';
import { translate }      from '@/utils/_i18n';
import { event, history } from '@/utils/utils';


export default {
	install( Vue ) {
		Vue.prototype.$pushALog = pushLog;
		
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
		
		Vue.prototype.$updateTelemetry = updateTelemetry;
		
		//if ( !app.useFakeData ) {
		//	const telemetrySocket = io( 'http://' + window.location.hostname + ':3000' );
		//	telemetrySocket.on( 'connect', () => {
		//		store.dispatch( 'app/showMessage', {
		//			icon:    '<i class="fas fa-truck"></i>',
		//			title:    'Connected to telemetry server',
		//			message: 'Ready to delivering'
		//		} );
		//
		//		setTimeout( () => {
		//			store.dispatch( 'app/showMessage', {
		//				icon:    '<i class="fas fa-truck"></i>',
		//				title:    'Waiting game connection',
		//				message: 'Run the game to start your job !'
		//			} );
		//		}, 5000 );
		//	} );
		//	telemetrySocket.on( 'update', updateTelemetry);
		//	telemetrySocket.on( 'log', data => {
		//		Vue.prototype.$updateEvent( data );
		//	} );
		//}
		
		// ---
		
		Vue.prototype.$t = translate;
	}
};