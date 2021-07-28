/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	history.plugin.js
 * Date: 	22/10/2020
 * Time: 	21:28
 */

import { EventBus } from '@/event-bus';
import store        from '@/store';
import { history }  from '@/utils/utils';
import * as moment  from 'moment';

export default {
	store,
	install( Vue ) {
		const defaultData = {
			histories: {
				h: []
			}
		};
		
		// --- Push a log
		
		Vue.prototype.$pushALog = ( message, zone, level = history.HTY_LEVEL.INFO ) => {
			EventBus.$emit( history.HTY_EVENT, {
				message,
				zone,
				level
			} );
		};
		
		Vue.mixin( {
			data() {
				return defaultData;
			},
			created() {
				EventBus.$on( history.HTY_EVENT, dataIn => {
					const date    = moment();
					const level   = dataIn.level;
					const zone    = dataIn.zone;
					const message = dataIn.message;
					const line    = `[ ${ date.format( 'YYYY-MM-DD HH:mm:ss' ) } ][ ${ level } ][ ${ zone } ] ${ message }`;
					
					if ( this.histories.h.indexOf( line ) === -1 ) {
						this.histories.h.push( line );
						this.histories.h = this.histories.h.slice(
							Math.max( this.histories.h.length - history.HTY_MAX_LINES, 0 )
						);
					}
					
					this.histories = Object.assign( {}, defaultData, this.histories );
				} );
			}
		} );
	}
};
