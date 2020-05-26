<script>
	import { mapGetters } from 'vuex';
	
	import * as utils from '../../utils/utils';
	
	import configMixins from '../../dashboards/jagfx/components/Mixins/configMixins';
	
	export default {
		name:    'dashMixins',
		mixins:  [ configMixins ],
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
			
			// --- Trailer
			
			$hasTrailer:       function () {
				return this.trailer.model.id.length !== 0;
			},
			$hasTrailerAndJob: function () {
				return this.trailer.model.id.length !== 0 && this.job.cargo.name.length !== 0;
			},
			
			
			// --- Navigation
			
			$trukGear:      function ( transmission, brand ) {
				/*console.log( this );*/
				const configSettings          = this.$configSettings();
				const hShiftLayout            = (configSettings.middle !== undefined)
					? configSettings.middle.hShiftLayout
					: { range: false, splitter: false };
				const rangeAndSplitterEnabled = hShiftLayout.range && hShiftLayout.splitter;
				
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
			$truckSpeed:    function () {
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
