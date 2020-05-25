<template>
	<div class="truck">
		<div class="t-info">
			<div class="theTruk">
				<div class="truck-data">
					<span></span>
					<!--					<img alt="" class="brand" v-bind:src="`img/Truck/brands/${brand.id}.svg`">-->
					<!--<img src="../assets/Truck/brands/volvo.svg" class="brand" alt="">-->
					<small>
						<span>{{truck.model.name}}</span>
					</small>
					<!--<span>
						{{(truck.fuel.avgConsumption * 100).toFixed(1)}} l/100
					</span>-->
				</div>
				<div class="truck-stats">
					<div class="damage right">
						<span>{{ $averageDamage( truck.damage ) }} %</span>
					</div>
					<span>
						<span class="licencePlate"><span class="flag">{{getFlag( truck.licensePlate.country.id )}}</span>{{truck.licensePlate.value}}</span>
					</span>
				</div>
			</div>
		</div>
		
		<!--<div class="truck-wear text-center capitalized">
			&lt;!&ndash;<div class="truck.damage" v-for="key in Object.keys(truck.damage)">
				<b>{{key}}</b>
				<span>{{Math.round(100 * truck.damage[key])}}%</span>
			</div>&ndash;&gt;
			<div class="truck.damage">
				<span>{{Math.floor(100 * chassis.truck.damage)}}%</span>
			</div>
		</div>-->
		
		<ul class="dash-element right">
			<!-- Cruise control -->
			<li v-bind:class="{
					'green' : truck.cruiseControl.enabled,
					'disabled' : !truck.cruiseControl.enabled
				}"
				v-if="elementIsEnabled( 'truck.cruiseControl' )">
				<span>{{truck.cruiseControl.enabled ? truck.cruiseControl.kph + ' km/h' : 'OFF'}}</span>
				<div class="round">
					<i class="icon-cruise_control"></i>
				</div>
			</li>
			
			<!-- Fuel -->
			<li class="blue" v-bind:class="{
					'orange': truck.fuel.warning.enabled
				}"
				v-if="elementIsEnabled( 'fuel' )">
				<span>{{Math.round(truck.fuel.value)}} L</span>
				<div class="round">
					<i class="icon-fuel"></i>
				</div>
			</li>
			
			<!-- Fuel consumption -->
			<li class="white" v-if="elementIsEnabled( 'fuelConsumption' )">
				<span>{{(truck.fuel.avgConsumption * 100).toFixed(1)}}</span>
				<div class="round">
					<i class="icon-fuel_consumption"></i>
				</div>
			</li>
			
			<!-- Air pressure -->
			<li class="blue" v-bind:class="{
					'orange': truck.brakes.airPressure.warning.enabled,
					'red': truck.brakes.airPressure.emergency.enabled
				}"
				v-if="elementIsEnabled( 'brakesAirPressure' )">
				<span>{{Math.round(truck.brakes.airPressure.value)}} PSI</span>
				<div class="round">
					<i class="icon-air_pressure"></i>
				</div>
			</li>
			
			<!-- Oil temperature -->
			<li class="default" v-if="elementIsEnabled( 'oilTemperature' )">
				<span>{{Math.round(truck.engine.oilTemperature.value)}} °C</span>
				<div class="round">
					<i class="icon-oil"></i>
				</div>
			</li>
			
			<!-- Brakes temparature -->
			<li class="white" v-if="elementIsEnabled( 'brakesTemperature' )">
				<span>{{Math.round(truck.brakes.temperature.value)}} °C</span>
				<div class="round">
					<i class="icon-startpoint"></i>
				</div>
			</li>
			
			<!-- Water temperature -->
			<li class="blue" v-bind:class="{
					'orange': truck.engine.waterTemperature.warning.enabled
				}"
				v-if="elementIsEnabled( 'waterTemperature' )">
				<span>{{Math.round(truck.engine.waterTemperature.value)}} °C</span>
				<div class="round">
					<i class="icon-water_temperature"></i>
				</div>
			</li>
			
			<!-- Battery -->
			<li class="blue" v-bind:class="{
					'orange': truck.engine.batteryVoltage.warning.enabled
				}"
				v-if="elementIsEnabled( 'batteryVoltage' )">
				<span>{{Math.round(truck.engine.batteryVoltage.value)}} V</span>
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
		/*props:  [
		 'brand',
		 'truck.model',
		 'truck.licensePlate',
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
		 'truck.engine',
		 'truck.damage',
		 'odometer',
		 'wipers',
		 'head',
		 'hook',
		 'chassis',
		 'differential',
		 'truck.cruiseControl'
		 ],*/
		
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
