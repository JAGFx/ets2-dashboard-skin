/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	game.events.js
 * Date: 	26-Apr-20
 * Time: 	17:12
 */

import { telemetry }       from '../helpers/server.helpers';
import { currency, logIt } from '../helpers/utils.helpers';

const log = ( eventName, rawData, text ) => {
	text = 'Game | ' + text;
	logIt( 'game.' + eventName, rawData, text );
};

export default () => {
	const eventNames = {
		connected:    'connected',
		disconnected: 'disconnected',
		pause:        'pause',
		fine:         'fine',
		tollgate:     'tollgate',
		ferry:        'ferry',
		train:        'train',
		refuelPayed:  'refuel-payed'
	};
	
	
	telemetry.game.on( eventNames.connected,
		() => log( eventNames.connected, null, 'Connected' )
	);
	telemetry.game.on( eventNames.disconnected,
		() => log( eventNames.disconnected, null, 'Disconnected' )
	);
	telemetry.game.on( eventNames.pause,
		( paused ) => {
			const text = paused ? 'Paused' : 'Unpaused';
			const data = {
				paused: paused
			};
			
			log( eventNames.pause, data, text );
		}
	);
	telemetry.game.on( eventNames.fine,
		( fine ) => {
			const text = `${ fine.offence.name }, ${ currency() }${ fine.amount.toLocaleString() } fine`;
			const data = {
				fine: fine
			};
			
			log( eventNames.fine, data, text );
		}
	);
	telemetry.game.on( eventNames.tollgate,
		( tollgate ) => {
			const text = `Toll paid ${ currency() }${ tollgate.amount.toLocaleString() }`;
			const data = {
				tollgate: tollgate
			};
			
			log( eventNames.tollgate, data, text );
		}
	);
	telemetry.game.on( eventNames.ferry,
		( ferry ) => {
			const text = `Ferry (${ ferry.source.name } -> ${ ferry.target.name })`;
			const data = {
				ferry: ferry
			};
			
			log( eventNames.ferry, data, text );
		}
	);
	telemetry.game.on( eventNames.train,
		( train ) => {
			const text = `Train (${ train.source.name } -> ${ train.target.name })`;
			const data = {
				train: train
			};
			
			log( eventNames.train, data, text );
		}
	);
	telemetry.game.on( eventNames.refuelPayed,
		() => log( eventNames.refuelPayed, null, `Refueling payed` )
	);
};
