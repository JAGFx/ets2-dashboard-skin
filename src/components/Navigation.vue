<template>
	<div class="nav text-center">
		<div class="nav-wrapper">
			<!-- Speed limit -->
			<div :class="{ 'hidden': speedLimit.kph === 0 }" class="speedLimits">
				<div class="speedLimitKPH">{{speedLimit.kph}}</div>
				<!--<div class="speedLimitMPH">{{speedLimit.mph}}</div>-->
			</div>
			<div class="speed">
				<span class="value">{{speed.kph}}</span>
				<small class="unit">km/h</small>
			</div>
			<div class="odometer">
				<span class="value">{{Math.round(odometer)}}</span>
				<small class="unit">km</small>
			</div>
			<div class="nav-bottom">
				<!-- Left elements -->
				<div class="nav-element-wrapper">
					<div :class="{ 'red': brakes.parking.enabled }" class="nav-element left">
						<span>
							<img alt="pk" src="">
						</span>
					</div>
					<div :class="{ 'orange': lights.beacon.enabled }" class="nav-element left">
						<span>
							<img alt="bc" src="">
						</span>
					</div>
				</div>
				
				<div :class="transmission.shifterType" class="truck-gear">
					<span class="value">{{getTrueGear()}}</span>
				</div>
				
				<!-- Right elements -->
				<div class="nav-element-wrapper">
					<div :class="{ 'blue': lights.beamHigh.enabled && lights.beamLow.enabled }" class="nav-element right">
						<span>
							<img alt="bh" src="">
						</span>
					</div>
					<div :class="{ 'green': lights.beamLow.enabled }" class="nav-element right">
						<span>
							<img alt="bl" src="">
						</span>
					</div>
				</div>
				
			</div>
			
		</div>
		<!--<div>
			&lt;!&ndash;<div><b>Next rest stop:</b><div>{{formatNextRestStop()}}</div></div>
			<div><b>Distance:</b><div>{{(distance / 1000).toFixed().toLocaleString()}}km / {{(distance * 0.0006213712).toFixed()}}Miles</div></div>
			<div><b>ETA</b><div>{{formatETA()}}</div></div>&ndash;&gt;
			&lt;!&ndash;<div><b>Speed</b><div>{{speed.kph}}kph / {{speed.mph}}mph</div></div>&ndash;&gt;
		</div>-->
	</div>
</template>

<script>
	import Window from '@/components/Window.vue';
	
	export default {
		name: 'Navigation',
		
		components: { Window },
		
		props: [
			'nextRestStop',
			'distance',
			'time',
			'speedLimit',
			'gameTime',
			'transmission',
			'speed',
			'brand',
			'odometer',
			'lights',
			'brakes'
		],
		
		methods: {
			formatTime:         function ( time ) {
				const hours = Math.floor( time / 3600000 );
				const min   = Math.floor( time % 3600000 / 60000 );
				
				return `${ hours }h ${ min }min`;
				
			},
			/*formatNextRestStop: function () {
				return this.formatTime( this.nextRestStop );
			},
			formatETA:          function () {
				const eta  = this.formatTime( this.time );
				const date = new Date( this.gameTime + this.time );
				
				const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
				
				return `${ days[ date.getUTCDay() ] } ${ date.getUTCHours() }:${ date.getUTCMinutes() } / ${ eta }`;
			},*/
			getTrueGear:        function () {
				/*console.log( this );*/
				let gear      = this.transmission.gear.displayed;
				let strGear = gear;
				
				if( this.transmission.shifterType === 'hshifter' ){
					let cruzeGear = 0;
					
					switch ( this.brand.name ) {
						case 'Volvo':
						case 'Scania':
						case 'Kenworth':
							cruzeGear = 2;
							break;
					}
					
					let realGearCount = gear - cruzeGear;
					let spliter       = (realGearCount % 2)
						? 'L'
						: 'H';
					let realGear      = Math.ceil( realGearCount / 2 );
					strGear       = realGear + spliter;
					
					if ( gear <= cruzeGear )
						strGear = 'C' + Math.abs( this.transmission.gear.displayed );
					
				}
				
				if( this.transmission.shifterType === 'automatic' ){
					strGear = 'D' + gear;
				}
				
				
				if ( gear === 0 )
					strGear = 'N';
				
				if ( gear < 0 )
					strGear = 'R' + Math.abs( this.transmission.gear.displayed );
				
				return strGear;
			}
		}
	};
</script>

<style scoped lang="scss">
	
	@import "../assets/scss/navigation/navigation";
	
	.nav {
		display: flex;
		justify-content: center;
		align-items: center;
		
		.nav-wrapper {
			width: 100%;
		}
	}

</style>
