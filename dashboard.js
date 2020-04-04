Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {
    //
    // skinConfig - a copy of the skin configuration from config.json
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    utils.preloadImages([
        'images/bg-off.png', 'images/bg-on.png',
        'images/blinker-left-off.png', 'images/blinker-left-on.png',
        'images/blinker-right-off.png', 'images/blinker-right-on.png',
        'images/cruise-off.png', 'images/cruise-on.png',
        'images/highbeam-off.png', 'images/highbeam-on.png',
        'images/lowbeam-off.png', 'images/lowbeam-on.png',
        'images/parklights-off.png', 'images/parklights-on.png',
        'images/trailer-off.png', 'images/trailer-on.png'
    ]);
};

Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {
	//console.log( data );
    //
    // data - telemetry data JSON object
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

	// --- Has job
    data.hasJob = data.trailer.attached;
    
    // --- Speed
    data.truck.speedRounded = Math.abs(data.truck.speed > 0
        ? Math.floor(data.truck.speed)
        : Math.round(data.truck.speed));
    
    // --- Cruse control speed
    data.truck.cruiseControlSpeedRounded = data.truck.cruiseControlOn
        ? Math.floor(data.truck.cruiseControlSpeed)
        : 0;
    
    // --- Trailer mass
    data.trailer.mass = data.hasJob ? (Math.round(data.trailer.mass / 1000.0) + 't') : '';

    // --- Odometer
    data.truck.odometer = utils.formatFloat(data.truck.odometer, 1);
    
    // --- Gear position
    data.truck.gear = data.truck.displayedGear; // use displayed gear
	
	var gear            = data.truck.displayedGear;
	var cruzeGear       = 0;
	
	switch ( data.truck.make ) {
		case 'Volvo':
		case 'Scania':
		case 'Kenworth':
			cruzeGear = 2;
			break;
	}
	
	var realGearCount = gear - cruzeGear;
	var spliter       = (realGearCount % 2)
		? 'L'
		: 'H';
	var realGear      = Math.ceil( realGearCount / 2 );
	var strGear       = realGear + spliter;
	
	if ( gear <= cruzeGear )
		strGear = 'C' + Math.abs( data.truck.gear );
	
	if ( gear === 0 )
		strGear = 'N';
	
	if ( gear < 0 )
		strGear = 'R' + Math.abs( data.truck.gear );
	
	data.truck.gear = strGear;
    
    // --- Average wear truck level
    var wearSumPercent = data.truck.wearEngine * 100 +
        data.truck.wearTransmission * 100 +
        data.truck.wearCabin * 100 +
        data.truck.wearChassis * 100 +
        data.truck.wearWheels * 100;
    
    data.truck.wearSum = Math.round(wearSumPercent / 5) + '%';
    
    // --- Average wear truck trailer level
    data.trailer.wear = Math.round(data.trailer.wear * 100) + '%';

    // --- Remaining travel distance
	data.navigation.estimatedDistance = ( data.navigation.estimatedDistance > 1000 )
		? Math.round( data.navigation.estimatedDistance / 1000 ) + " km"
		: data.navigation.estimatedDistance + " m";

	// --- Fuel consumption
	data.truck.fuelAverageConsumption *= 100;
	
	// --- End, return data
	return data;
};

Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {
    //
    // data - same data object as in the filter function
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //
	
	// --- Air pressure
	if( data.truck.airPressure < data.truck.airPressureEmergencyValue )
		$( '._truck-airPressure' ).addClass( 'yes' );
	else
		$( '._truck-airPressure' ).removeClass( 'yes' );
};
