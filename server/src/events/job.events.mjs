/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	job.events.mjs
 * Date: 	26-Apr-20
 * Time: 	17:16
 */

import { telemetry }       from '../helpers/server.helpers';
import { currency, logIt } from '../helpers/utils.helpers';

const log = ( eventName, rawData, text ) => {
	text = 'Job | ' + text;
	logIt( 'job.' + eventName, rawData, text );
};

const eventNames = {
	cancelled: 'cancelled',
	delivered: 'delivered',
	finished:  'finished',
	started:   'started'
};

export default () => {
	telemetry.job.on( eventNames.cancelled,
		( job ) => {
			const text = `Job cancelled, Penalty: ${ currency() }${ job.penalty.toLocaleString() }`;
			const data = {
				job: job
			};
			
			log( eventNames.cancelled, data, text );
		}
	);
	telemetry.job.on( eventNames.delivered,
		( job ) => {
			const text = `Job delivered, ${ currency() }${ job.revenue.toLocaleString() } / ${ job.earnedXP }XP`;
			const data = {
				job: job
			};
			
			log( eventNames.delivered, data, text );
		}
	);
	telemetry.job.on( eventNames.finished,
		( job ) => {
			const data = {
				job: job
			};
			log( eventNames.finished, data, 'Job finished' );
		}
	);
	telemetry.job.on( eventNames.started,
		( job ) => {
			const data = {
				job: job
			};
			
			log( eventNames.started, data, 'New job started' );
		}
	);
};
