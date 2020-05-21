<template>
	<div class="truck">
		<div class="t-info">
			<div class="theTruk">
				<div class="truck-data">
					<span></span>
					<!--					<img alt="" class="brand" v-bind:src="`img/Truck/brands/${brand.id}.svg`">-->
					<!--<img src="../assets/Truck/brands/volvo.svg" class="brand" alt="">-->
					<small>
						<span>{{model.name}}</span>
					</small>
					<!--<span>
						{{(fuel.avgConsumption * 100).toFixed(1)}} l/100
					</span>-->
				</div>
				<div class="truck-stats">
					<div class="damage right">
						<span>{{ $averageDamage( damage ) }} %</span>
					</div>
					<span>
						<span class="licencePlate"><span class="flag">{{getFlag( licensePlate.country.id )}}</span>{{licensePlate.value}}</span>
					</span>
				</div>
			</div>
		</div>
		
		<!--<div class="truck-wear text-center capitalized">
			&lt;!&ndash;<div class="damage" v-for="key in Object.keys(damage)">
				<b>{{key}}</b>
				<span>{{Math.round(100 * damage[key])}}%</span>
			</div>&ndash;&gt;
			<div class="damage">
				<span>{{Math.floor(100 * chassis.damage)}}%</span>
			</div>
		</div>-->
		
		<ul class="dash-element right">
			<!-- Cruise control -->
			<li v-bind:class="{
					'green' : cruiseControl.enabled,
					'disabled' : !cruiseControl.enabled
				}"
				v-if="elementIsEnabled( 'cruiseControl' )">
				<span>{{cruiseControl.enabled ? cruiseControl.kph + ' km/h' : 'OFF'}}</span>
				<div class="round">
					<i class="icon-cruise_control"></i>
				</div>
			</li>
			
			<!-- Fuel -->
			<li class="blue" v-bind:class="{
					'orange': fuel.warning.enabled
				}"
				v-if="elementIsEnabled( 'fuel' )">
				<span>{{Math.round(fuel.value)}} L</span>
				<div class="round">
					<i class="icon-fuel"></i>
				</div>
			</li>
			
			<!-- Fuel consumption -->
			<li class="white" v-if="elementIsEnabled( 'fuelConsumption' )">
				<span>{{(fuel.avgConsumption * 100).toFixed(1)}}</span>
				<div class="round">
					<i class="icon-fuel_consumption"></i>
				</div>
			</li>
			
			<!-- Air pressure -->
			<li class="blue" v-bind:class="{
					'orange': brakes.airPressure.warning.enabled,
					'red': brakes.airPressure.emergency.enabled
				}"
				v-if="elementIsEnabled( 'brakesAirPressure' )">
				<span>{{Math.round(brakes.airPressure.value)}} PSI</span>
				<div class="round">
					<i class="icon-air_pressure"></i>
				</div>
			</li>
			
			<!-- Oil temperature -->
			<li class="default" v-if="elementIsEnabled( 'oilTemperature' )">
				<span>{{Math.round(engine.oilTemperature.value)}} °C</span>
				<div class="round">
					<i class="icon-oil"></i>
				</div>
			</li>
			
			<!-- Brakes temparature -->
			<li class="white" v-if="elementIsEnabled( 'brakesTemperature' )">
				<span>{{Math.round(brakes.temperature.value)}} °C</span>
				<div class="round">
					<i class="icon-startpoint"></i>
				</div>
			</li>
			
			<!-- Water temperature -->
			<li class="blue" v-bind:class="{
					'orange': engine.waterTemperature.warning.enabled
				}"
				v-if="elementIsEnabled( 'waterTemperature' )">
				<span>{{Math.round(engine.waterTemperature.value)}} °C</span>
				<div class="round">
					<i class="icon-water_temperature"></i>
				</div>
			</li>
			
			<!-- Battery -->
			<li class="blue" v-bind:class="{
					'orange': engine.batteryVoltage.warning.enabled
				}"
				v-if="elementIsEnabled( 'batteryVoltage' )">
				<span>{{Math.round(engine.batteryVoltage.value)}} V</span>
				<div class="round">
					<i class="icon-battery"></i>
				</div>
			</li>
			
			<!-- Empty -->
			<li :key="i" class="disabled" v-for="i in indexEmptyElement()">
				<span></span>
				<div class="round">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import dashMixins from '../../../../../components/Mixins/dashMixins';
	import * as utils from '../../../../../utils/utils';
	
	export default {
		name:   'Truck',
		mixins: [ dashMixins ],
		props:  [
			'brand',
			'model',
			'licensePlate',
			'transmission',
			'fuel',
			'adBlue',
			'cabin',
			'lights',
			'position',
			'acceleration',
			'orientation',
			'brakes',
			'wheels',
			'engine',
			'damage',
			'odometer',
			'wipers',
			'head',
			'hook',
			'chassis',
			'differential',
			'cruiseControl'
		],
		
		methods: {
			indexEmptyElement: function () {
				const elementLength = this.$elementsLength( 'right' );
				const maxElement    = this.$maxSideElements();
				const diff          = maxElement - elementLength;
				
				//console.log( elementLength, maxElement, diff, this.currentEnabled );
				
				return (diff <= 0)
					? 0
					: diff;
			},
			elementIsEnabled:  function ( element ) {
				return this.$elementIsEnabled( 'right', element );
			},
			getFlag( countryName ) {
				return utils.app.flag( countryName );
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../../assets/scss/truck/truck";
</style>
