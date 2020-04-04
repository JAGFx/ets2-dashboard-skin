<template>
	<div class="nav text-center">
		<div class="nav-wrapper">
			<div class="truck-gear">
				<span>{{getTrueGear()}}</span>
			</div>
			<div class="speed">
				<span class="value">{{speed.kph}}</span>
				<small class="unit">km/h</small>
			</div>
			<div class="speedLimits">
				<div class="speedLimitKPH">{{speedLimit.kph}}</div>
				<!--<div class="speedLimitMPH">{{speedLimit.mph}}</div>-->
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
			'brand'
		],
		
		data: function () {
			return {};
		},
		
		methods: {
			formatTime:         function ( time ) {
				const hours = Math.floor( time / 3600000 );
				const min   = Math.floor( time % 3600000 / 60000 );
				
				return `${ hours }h ${ min }min`;
				
			},
			formatNextRestStop: function () {
				return this.formatTime( this.nextRestStop );
			},
			formatETA:          function () {
				const eta  = this.formatTime( this.time );
				const date = new Date( this.gameTime + this.time );
				
				const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
				
				return `${ days[ date.getUTCDay() ] } ${ date.getUTCHours() }:${ date.getUTCMinutes() } / ${ eta }`;
			},
			/*formatSpeed: function ( speed ) {
				Math.abs( speed > 0
					? Math.floor( speed )
					: Math.round( speed ) );
			},*/
			getTrueGear: function () {
				/*console.log( this );*/
				let gear            = this.transmission.gear.displayed;
				let cruzeGear       = 0;
				
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
				let strGear       = realGear + spliter;
				
				if ( gear <= cruzeGear )
					strGear = 'C' + Math.abs( this.transmission.gear.displayed );
				
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
	.nav {
		/*display: grid;
		grid-template-columns: minmax(0, 1fr) 120px;*/
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		.nav-wrapper{ width: 100%; }
		
		.truck-gear {
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;
			
			> span {
				background: #FFF;
				color: #000;
				font-size: 2rem;
				padding: 0.3rem 1rem;
			}
		}
		
		.speed {
			margin: 1rem 0;
			padding: 2rem 0;
			
			background: var(--color-border);
			border-radius: 10rem / 16rem;
			border: 2px solid var(--color-red);
			border-width: 0 3px;
			
			> * {
				display: block;
			}
			
			.value {
				font-family: suprrpg !important;
				font-size: 5.5rem;
				line-height: 5rem;
			}
			
			> .unit {
				padding-top: .5rem;
				font-size: 1.5rem;
			}
		}
		
		.speedLimits {
			/* display: grid;
			 grid-template-rows: auto 1fr;
			 grid-template-columns: 120px 120px;
			 grid-gap: var(--spacing);*/
			
			display: flex;
			justify-content: center;
			align-items: center;
			
			> * {
				margin: .5rem;
			}
			
			.speedLimitKPH,
			.speedLimitMPH {
				background-color: var(--color-white);
				color: black;
				width: 2.5rem;
				height: 2.5rem;
				font-size: 1.1rem;
				font-weight: bold;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.speedLimitKPH {
				border: .3rem solid var(--color-red);
				border-radius: 50%;
			}
			
			.speedLimitMPH {
				border: .3rem solid var(--color-black);
				border-radius: 20px;
			}
		}
	}

</style>
