/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	theDash.js
 * Date: 	04-Apr-20
 * Time: 	10:13
 */

const truckSimTelemetry = require("trucksim-telemetry");

const telemetry = truckSimTelemetry();

function update(data) {
	console.log(data.truck.speed) // => current speed object
}

telemetry.watch({interval: 100}, update);
