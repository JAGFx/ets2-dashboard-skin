/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_event.js
 * Date: 	14/07/2020
 * Time: 	11:17
 */

const eventNameToComponent = function ( eventName ) {
	switch ( eventName ) {
		case 'job.delivered':
			return 'EventOverlayJobDelivered';
		
		default:
			return null;
	}
};

export default {
	eventNameToComponent
};
