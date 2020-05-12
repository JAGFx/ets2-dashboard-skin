<template>
	<div class="nav text-center">
		<div class="icons-item-wrappers">
			<div class="dash-symbol-area">
				<!-- Left elements -->
				<DashSymbolArea side="left"></DashSymbolArea>
				
				<div :class="transmission.shifterType" class="truck-gear">
					<span class="value">{{ $trukGear(transmission, brand) }}</span>
				</div>
				
				<!-- Right elements -->
				<DashSymbolArea side="right"></DashSymbolArea>
			</div>
			
			<!-- Speed -->
			
			<div class="speed-area">
				<div class="speed-wrapper">
					<div class="left" v-if="elementIsEnabled( 'rpm' )">
						<RPMBars v-bind="{
							engine: engine,
							brand: brand,
							model: model
						}"></RPMBars>
					</div>
					<div class="middle">
						<div class="speed">
							<span class="value">{{speed.kph}}</span>
							<small class="unit">km/h</small>
						</div>
						
						<div class="fuel-level" v-if="elementIsEnabled( 'fuel' )">
							<span class="fuel-icon-wrapper">
								<i :class="{'warning': onWarningLevel() }" class="icon-fuel"></i>
							</span>
							
							<div class="bars">
								<div :class="{ 'active' : getFuelBarActive( i ) }" class="bar" :key="i" v-for="i in getFuelBarCount()"></div>
							</div>
						</div>
					</div>
					<div class="right" v-if="elementIsEnabled( 'rpm' )">
						<RPMBars v-bind="{
							engine: engine,
							brand: brand,
							model: model
						}"></RPMBars>
					</div>
				</div>
			</div>
			
			<!--<div class="speed">
				<span class="value">{{speed.kph}}</span>
				<small class="unit">km/h</small>
			</div>-->
			
			<div class="odometer">
				<span class="value">{{Math.round(odometer)}}</span>
				<small class="unit">km</small>
			</div>
			
			<!-- Speed limit -->
			<div :class="{ 'hidden': speedLimit.kph === 0 }" class="speedLimits" v-if="elementIsEnabled( 'speedLimit' )">
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
	import dashMixins     from '../../../../../components/Mixins/dashMixins';
	import DashSymbolArea from '../../Elements/DashSymbolArea';
	import RPMBars        from './Elements/RPMBars';
	
	export default {
		name:       'Navigation',
		components: { DashSymbolArea, RPMBars },
		mixins:     [ dashMixins ],
		props:      [
			'nextRestStop',
			'distance',
			'time',
			'speedLimit',
			'gameTime',
			'transmission',
			'speed',
			'brand',
			'model',
			'odometer',
			'lights',
			'brakes',
			'fuel',
			'engine'
		],
		
		methods: {
			formatTime:       function ( time ) {
				const hours = Math.floor( time / 3600000 );
				const min   = Math.floor( time % 3600000 / 60000 );
				
				return `${ hours }h ${ min }min`;
			},
			getFuelByBar:     function () {
				return (this.fuel.capacity * this.fuel.warning.factor).toFixed( 0 );
			},
			getFuelBarCount:  function () {
				return Math.ceil( this.fuel.capacity / this.getFuelByBar() );
			},
			getFuelBarActive: function ( i ) {
				const fuelByBar   = this.getFuelByBar();
				const iLow        = i - 1;
				const fuelBarFrom = (iLow * fuelByBar);
				
				//console.log( i, this.fuel.value, fuelBarFrom );
				return (this.fuel.value >= fuelBarFrom);
			},
			onWarningLevel:   function () {
				return this.fuel.value < this.getFuelByBar();
			},
			elementIsEnabled: function ( element ) {
				const onBottom = [ 'rpm', 'fuel', 'speedLimit' ];
				const side     = (onBottom.indexOf( element ) !== -1)
					? 'middle-b'
					: 'middle-t';
				
				return this.$elementIsEnabled( side, element );
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../../assets/scss/navigation/navigation";
</style>
