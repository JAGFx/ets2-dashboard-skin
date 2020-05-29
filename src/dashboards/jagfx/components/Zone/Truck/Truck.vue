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
						{{truck.fuel.avgConsumption | unit_consumption}} l/100
					</span>-->
				</div>
				<div class="truck-stats">
					<div class="damage right">
						<span>{{ $averageDamage( truck.damage ) }} %</span>
					</div>
					<span>
						<span class="licencePlate"><span class="flag">{{ $flag( truck.licensePlate.country.id )}}</span>{{truck.licensePlate.value}}</span>
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
				v-if="elementIsEnabled( 'jagfx_elements_right_cruiseControl' )">
				<span v-show="!truck.cruiseControl.enabled">OFF</span>
				<span v-show="truck.cruiseControl.enabled">{{ truck.cruiseControl | unit_speed }}</span>
				<div class="round">
					<i class="icon-cruise_control"></i>
				</div>
			</li>
			
			<!-- Fuel -->
			<li class="blue" v-bind:class="{
					'orange': truck.fuel.warning.enabled
				}"
				v-if="elementIsEnabled( 'jagfx_elements_right_fuel' )">
				<span>{{ truck.fuel.value | unit_volume }}</span>
				<div class="round">
					<i class="icon-fuel"></i>
				</div>
			</li>
			
			<!-- Fuel consumption -->
			<li class="white" v-if="elementIsEnabled( 'jagfx_elements_right_fuelConsumption' )">
				<span>{{ truck.fuel.avgConsumption | unit_consumption }}</span>
				<div class="round">
					<i class="icon-fuel_consumption"></i>
				</div>
			</li>
			
			<!-- Air pressure -->
			<li class="blue" v-bind:class="{
					'orange': truck.brakes.airPressure.warning.enabled,
					'red': truck.brakes.airPressure.emergency.enabled
				}"
				v-if="elementIsEnabled( 'jagfx_elements_right_brakesAirPressure' )">
				<span>{{ truck.brakes.airPressure.value | unit_pressure }}</span>
				<div class="round">
					<i class="icon-air_pressure"></i>
				</div>
			</li>
			
			<!-- Oil temperature -->
			<li class="default" v-if="elementIsEnabled( 'jagfx_elements_right_oilTemperature' )">
				<span>{{ truck.engine.oilTemperature.value | unit_degrees }}</span>
				<div class="round">
					<i class="icon-oil"></i>
				</div>
			</li>
			
			<!-- Brakes temparature -->
			<li class="white" v-if="elementIsEnabled( 'jagfx_elements_right_brakesTemperature' )">
				<span>{{ truck.brakes.temperature.value | unit_degrees }}</span>
				<div class="round">
					<i class="icon-startpoint"></i>
				</div>
			</li>
			
			<!-- Water temperature -->
			<li class="blue" v-bind:class="{
					'orange': truck.engine.waterTemperature.warning.enabled
				}"
				v-if="elementIsEnabled( 'jagfx_elements_right_waterTemperature' )">
				<span>{{ truck.engine.waterTemperature.value | unit_degrees }}</span>
				<div class="round">
					<i class="icon-water_temperature"></i>
				</div>
			</li>
			
			<!-- Battery -->
			<li class="blue" v-bind:class="{
					'orange': truck.engine.batteryVoltage.warning.enabled
				}"
				v-if="elementIsEnabled( 'jagfx_elements_right_batteryVoltage' )">
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
	import AppDashMixins   from '../../../../../components/Mixins/AppDashMixins';
	import JagfxConfigMixins from '../../Mixins/JagfxConfigMixins';
	
	export default {
		name:    'Truck',
		mixins:  [ AppDashMixins, JagfxConfigMixins ],
		methods: {
			indexEmptyElement: function () {
				const elementLength = this.$elementsLength( 'right' );
				const maxElement    = this.maxElements[ 'right' ];
				const diff          = maxElement - elementLength;
				
				return (diff <= 0)
					? 0
					: diff;
			},
			elementIsEnabled:  function ( element ) {
				return this.$elementIsEnabled( 'right', element );
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../../assets/scss/truck/truck";
</style>
