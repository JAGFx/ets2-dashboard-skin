<script>
	import configMixins from '../../dashboards/jagfx/components/Mixins/configMixins';
	
	export default {
		name:    'dashMixins',
		mixins:  [ configMixins ],
		methods: {
			$double:     function ( num ) {
				return num < 10 ? `0${ num }` : num;
			},
			$formatDate: function ( unix ) {
				const date = new Date( unix );
				
				const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
				
				return `${ days[ date.getUTCDay() ] } ${ this.$double( date.getUTCHours() ) }:${ this.$double( date.getUTCMinutes() ) }`;
			},
			$formatTime: function ( unix ) {
				const d   = new Date( unix );
				const dys = d.getUTCDate() - 1;
				const hrs = d.getUTCHours();
				const mnt = d.getUTCMinutes();
				
				return `${ this.$double( dys ) }:${ this.$double( hrs ) }:${ this.$double( mnt ) }:00`;
			},
			$telemetryData() {
				return this.$children[ 0 ].telemetryData();
			},
			$averageDamage( arrayDamage ) {
				const keyLength = Object.keys( arrayDamage ).length;
				let sum         = 0;
				
				for ( const key in this.damage ) {
					sum += this.damage[ key ];
				}
				
				return sum / keyLength;
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
			$trukGear:   function ( transmission, brand ) {
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
			}
		}
	};
</script>
