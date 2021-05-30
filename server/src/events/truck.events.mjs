/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	truck.events.mjs
 * Date: 	26-Apr-20
 * Time: 	17:16
 */

import { telemetry } from '../helpers/server.helpers';
import { logIt }     from '../helpers/utils.helpers';

const log = ( eventName, rawData, text ) => {
	text = 'Truck | ' + text;
	logIt( 'truck.' + eventName, rawData, text );
};

const eventNames = {
	cruiseControl:         'cruise-control',
	cruiseControlIncrease: 'cruise-control-increase',
	cruiseControlDecrease: 'cruise-control-decrease',
	warning:               'warning',
	emergency:             'emergency',
	electric:              'electric',
	engine:                'engine',
	park:                  'park',
	damage:                'damage',
	refuel:                'refuel'
};


export default () => {
	telemetry.truck.on( eventNames.cruiseControl,
		( enabled ) => {
			const text = `Cruise control ${ enabled ? 'Enabled' : 'Disabled' }`;
			const data = {
				enabled: enabled
			};
			
			log( eventNames.cruiseControl, data, text );
		}
	);
	telemetry.truck.on( eventNames.cruiseControlIncrease,
		( cruiseControl ) => {
			const text = `Cruise control increased to ${ cruiseControl.currentSpeed.kph }kph / ${ cruiseControl.currentSpeed.mph }mph`;
			const data = {
				cruiseControl: cruiseControl.currentSpeed
			};
			
			log( eventNames.cruiseControlIncrease, data, text );
		}
	);
	telemetry.truck.on( eventNames.cruiseControlDecrease,
		( cruiseControl ) => {
			const text = `Cruise control decreased to ${ cruiseControl.currentSpeed.kph }kph / ${ cruiseControl.currentSpeed.mph }mph`;
			const data = {
				cruiseControl: {
					enabled: cruiseControl.enabled,
					...cruiseControl.currentSpeed
				}
			};
			
			log( eventNames.cruiseControlDecrease, data, text );
		}
	);
	telemetry.truck.on( eventNames.warning,
		( warning, enabled ) => {
			const text = enabled ? `Warning: ${ warning }` : `${ warning } warning disabled`;
			const data = {
				warning: warning,
				enabled: enabled
			};
			
			log( eventNames.warning, data, text );
		}
	);
	telemetry.truck.on( eventNames.emergency,
		( emergency, enabled ) => {
			const text = enabled ? `Emergency: ${ emergency }` : `${ emergency } emergency disabled`;
			const data = {
				emergency: emergency,
				enabled:   enabled
			};
			
			log( eventNames.emergency, data, text );
		}
	);
	telemetry.truck.on( eventNames.electric,
		( enabled ) => {
			const text = `Truck electrical ${ enabled ? 'ON' : 'OFF' }`;
			const data = {
				enabled: enabled
			};
			
			log( eventNames.electric, data, text );
		}
	);
	telemetry.truck.on( eventNames.engine,
		( enabled ) => {
			const text = `Truck engine ${ enabled ? 'ON' : 'OFF' }`;
			const data = {
				enabled: enabled
			};
			
			log( eventNames.engine, data, text );
		}
	);
	telemetry.truck.on( eventNames.park,
		( enabled ) => {
			const text = `Parking brake ${ enabled ? 'ON' : 'OFF' }`;
			const data = {
				enabled: enabled
			};
			
			log( eventNames.park, data, text );
		}
	);
	telemetry.truck.on( eventNames.damage,
		( damages ) => {
			const text = `Truck damage increased ${ (100 * damages.chassis).toFixed() }%`;
			const data = {
				damages: damages
			};
			
			log( eventNames.damage, data, text );
		}
	);
	telemetry.truck.on( eventNames.refuel,
		( curr, prev ) => {
			const text = `Truck refueled from ${ prev.amount } to ${ curr.amount }`;
			const data = {
				curr: curr,
				prev: prev
			};
			
			log( eventNames.refuel, data, text );
		}
	);
};
