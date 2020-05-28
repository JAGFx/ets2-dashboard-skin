<script>
	import {
		length as uc_length,
		mass as uc_mass,
		pressure as uc_pressure,
		temperature as uc_temperature,
		volume as uc_volume
	}                     from 'units-converter';
	import { mapGetters } from 'vuex';
	
	import utilsConfig from '../../utils/_config';
	
	import * as utils from '../../utils/utils';
	
	export default {
		name:    'dashMixins',
		data() {
			return this.pickData()();
		},
		created() {
			//console.log( utils.app.formatConstants );
			Object.keys( utils.app.formatConstants ).forEach( ( key ) => {
				const value = utils.app.formatConstants[ key ];
				this[ key ] = value;
			} );
		},
		filters: {
			$dateTimeLocalized( time, dFormat, tFormat ) {
				return utils.app.dateTimeLocalized( time, dFormat, tFormat );
			},
			unit_currency( value, showValue = true, showSymbol = true ) {
				const configValue         = utilsConfig.load();
				const currencySymbolValue = configValue.unit_currency;
				let unit                  = '';
				
				switch ( currencySymbolValue ) {
					case 'EUR':
						unit = '€';
						break;
					case 'GBP':
						unit = '£';
						value *= 0.9;
						break;
					case 'USD':
						unit = '$';
						value *= 1.1;
						break;
				}
				
				if ( showValue && !showSymbol )
					return value;
				
				if ( !showValue && showSymbol )
					return unit;
				
				return unit + ' ' + value.toLocaleString();
			},
			unit_length( value, unitFrom = 'm', showValue = true, showSymbol = true ) {
				const configValue  = utilsConfig.load();
				const length       = configValue.unit_length;
				const unitExcluded = [ 'in', 'yd', 'ft-us', 'fathom', 'nMi' ];
				let unit           = '';
				
				let conversion = uc_length( value )
					.from( unitFrom )
					.to( length );
				
				switch ( length ) {
					case 'm':
						conversion = uc_length( conversion.value )
							.from( length )
							.toBest( { exclude: unitExcluded } );
						
						break;
					case 'ft':
						conversion = uc_length( conversion.value )
							.from( length )
							.toBest( { exclude: unitExcluded } );
						
						break;
				}
				
				value = conversion.value.toFixed( 1 );
				unit  = conversion.unit;
				
				if ( showValue && !showSymbol )
					return value;
				
				if ( !showValue && showSymbol )
					return unit;
				
				return value.toLocaleString() + ' ' + unit;
			},
			unit_weight( value, showValue = true, showSymbol = true ) {
				const configValue  = utilsConfig.load();
				const weight       = configValue.unit_weight;
				const unitExcluded = [ 'mcg', 'mg', 'mt', 'oz' ];
				let unit           = '';
				
				let conversion = uc_mass( value )
					.from( 'kg' )
					.to( weight );
				
				switch ( weight ) {
					case 'kg':
						conversion = uc_mass( conversion.value )
							.from( weight )
							.toBest( { exclude: unitExcluded } );
						
						break;
					case 'lb':
						conversion = uc_mass( conversion.value )
							.from( weight )
							.toBest( { exclude: unitExcluded } );
						
						break;
				}
				
				value = conversion.value;
				unit  = conversion.unit;
				
				if ( showValue && !showSymbol )
					return value;
				
				if ( !showValue && showSymbol )
					return unit;
				
				return value.toFixed( 1 ) + ' ' + unit;
			},
			unit_speed( value, showValue = true, showSymbol = true ) {
				const configValue = utilsConfig.load();
				const speed       = configValue.unit_speed;
				let unit          = '';
				
				value = value[ speed ];
				
				switch ( speed ) {
					case 'kph':
						unit = 'km/h';
						break;
					case 'mph':
						unit = 'm/h';
						break;
				}
				
				if ( showValue && !showSymbol )
					return value;
				
				if ( !showValue && showSymbol )
					return unit;
				
				return value.toFixed( 0 ) + ' ' + unit;
			},
			unit_volume( value, showValue = true, showSymbol = true ) {
				const configValue = utilsConfig.load();
				const unitDefined = configValue.unit_volume;
				
				let unit = '';
				
				let conversion = uc_volume( value )
					.from( 'l' )
					.to( unitDefined );
				
				value = conversion.value;
				unit  = conversion.unit;
				
				if ( showValue && !showSymbol )
					return value;
				
				if ( !showValue && showSymbol )
					return unit;
				
				return value.toFixed( 0 ) + ' ' + unit;
			},
			unit_consumption( value, showValue = true, showSymbol = true ) {
				const configValue = utilsConfig.load();
				const unitDefined = configValue.unit_consumption;
				let conversion    = null;
				
				let unit = '';
				
				value *= 100;
				
				switch ( unitDefined ) {
					case 'lpkm':
						conversion = {
							unit:  'L/100',
							value: value
						};
						
						break;
					case 'mpg':
						conversion = {
							unit:  'MPG',
							value: (value === 0)
									   ? 0
									   : 282.4809363 / value
						};
						
						break;
				}
				
				value = conversion.value;
				unit  = conversion.unit;
				
				if ( showValue && !showSymbol )
					return value;
				
				if ( !showValue && showSymbol )
					return unit;
				
				return value.toFixed( 1 ) + ' ' + unit;
			},
			unit_pressure( value, showValue = true, showSymbol = true ) {
				const configValue = utilsConfig.load();
				const unitDefined = configValue.unit_pressure;
				
				let unit = '';
				
				let conversion = uc_pressure( value )
					.from( 'psi' )
					.to( unitDefined );
				
				value = conversion.value;
				unit  = conversion.unit;
				
				if ( showValue && !showSymbol )
					return value;
				
				if ( !showValue && showSymbol )
					return unit;
				
				return value.toFixed( 0 ) + ' ' + unit;
			},
			unit_degrees( value, showValue = true, showSymbol = true ) {
				const configValue = utilsConfig.load();
				const unitDefined = configValue.unit_degrees;
				
				let unit = '';
				
				let conversion = uc_temperature( value )
					.from( 'C' )
					.to( unitDefined );
				
				value = conversion.value;
				unit  = '°' + conversion.unit;
				
				if ( showValue && !showSymbol )
					return value;
				
				if ( !showValue && showSymbol )
					return unit;
				
				return value.toFixed( 0 ) + ' ' + unit;
			}
		},
		methods: {
			// ---------------------------------------
			// --- Commons methods
			
			// --- Commons
			
			$flag( countryName ) {
				return utils.app.flag( countryName );
			},
			$averageDamage( arrayDamage ) {
				const keyLength = Object.keys( arrayDamage ).length;
				let sum         = 0;
				
				for ( const key in arrayDamage ) {
					sum += arrayDamage[ key ];
				}
				
				return Math.floor( 100 * (sum / keyLength) );
			},
			$scale( currentSkin ) {
				const scaleX = (currentSkin.size.width === 0)
					? 1
					: window.innerWidth / currentSkin.size.width;
				
				const scaleY = (currentSkin.size.height === 0)
					? 1
					: (window.innerHeight - 41) / currentSkin.size.height;
				
				return Math.min( scaleX, scaleY );
			},
			$pressureToBar: function ( inPressure, unit = 'bar' ) {
				let pressure;
				
				switch ( unit ) {
					case 'bar':
						pressure = inPressure * 0.0689476;
						break;
					
					default:
						pressure = inPressure;
						break;
				}
				
				return pressure;
			},
			
			// --- Job
			
			$hasJob: function () {
				return (this.job.cargo.id.length !== 0);
			},
			$jobRemainingTimeDelivery( time ) {
				const currentGameTime = this.game.time.unix;
				
				return utils.app.diffDateTimeLocalized( currentGameTime, time );
			},
			
			// --- Trailer
			
			$hasTrailer:       function () {
				return this.trailer.model.id.length !== 0;
			},
			$hasTrailerAndJob: function () {
				return this.trailer.model.id.length !== 0 && this.job.cargo.name.length !== 0;
			},
			
			
			// --- Navigation
			
			$trukGear:   function ( transmission, brand ) {
				/*console.log( this );*/
				const configSettings          = utilsConfig.load();
				const hShiftLayout            = configSettings[ 'general_h-shift-layout' ];
				const rangeAndSplitterEnabled = hShiftLayout === 'h-shifter';
				
				let gear         = transmission.gear.displayed;
				let strGear      = gear;
				let crawlingGear = 0;
				
				switch ( brand.name ) {
					case 'Volvo':
					case 'Scania':
					case 'Kenworth':
						crawlingGear = 2;
						break;
				}
				
				//console.log( rangeAndSplitterEnabled );
				if ( transmission.shifterType === 'hshifter' && rangeAndSplitterEnabled ) {
					let realGearCount = gear - crawlingGear;
					let spliter       = (realGearCount % 2)
						? 'L'
						: 'H';
					let realGear      = Math.ceil( realGearCount / 2 );
					strGear           = realGear + spliter;
				} else {
					strGear = gear - crawlingGear;
				}
				
				if ( gear <= crawlingGear )
					strGear = 'C' + Math.abs( gear );
				
				if ( transmission.shifterType === 'automatic' )
					strGear = 'D' + gear;
				
				if ( gear === 0 )
					strGear = 'N';
				
				if ( gear < 0 )
					strGear = 'R' + Math.abs( transmission.gear.displayed );
				
				return strGear;
			},
			$truckSpeed: function () {
				return Math.abs( this.truck.speed.value * 3.6 );
			},
			
			// ----------------
			...mapGetters( {
				pickData: 'telemetry/pick'
				//currentSkin: 'skins/current'
			} )
			
		}
		
	};
</script>
