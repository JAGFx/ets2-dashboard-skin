<template>
	<div class="truck">
		<div class="t-info">
			<div class="theTruk">
				<div class="truck-data">
					<!--FIXME: Do not show the picture because the final path was wrong-->
					<img alt="" class="brand" v-bind:src="`img/Truck/brands/${brand.id}.svg`">
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
						<span>{{Math.floor(100 * chassis.damage)}} %</span>
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
				<span>{{Math.round(brakes.airPressure.value)}} psi</span>
				<div class="round">
					<i class="icon-air_pressure"></i>
				</div>
			</li>
			
			<!-- Oil temperature -->
			<li class="orange" v-if="elementIsEnabled( 'oilTemperature' )">
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
			<li class="disabled" v-for="i in indexEmptyElement()">
				<span></span>
				<div class="round">
				</div>
			</li>
		</ul>
		
		<!--<div class="general list">
			<div><b>Brand:</b><span>{{brand.name}}</span></div>
			<div><b>Model:</b><span>{{model.name}}</span></div>
			<div><b>License plate:</b><span>{{licensePlate.value}} ({{licensePlate.country.name}})</span></div>
			<div><b>Odometer:</b><span>{{Math.round(odometer).toLocaleString()}} KM / {{Math.round(odometer * 0.6213712).toLocaleString()}} Miles</span>
			</div>
			<div><b>Wipers enabled:</b><span>{{wipers.enabled ? 'YES' : 'NO'}}</span></div>
			<div><b>Avg fuel consumption:</b><span>{{(fuel.avgConsumption * 100).toFixed(1)}} l/100km</span></div>
		</div>
		
		<div class="chassis list">
		  <div><b>Damage:</b><span>{{Math.floor(100 * chassis.damage)}}%</span></div>
		  <div><b>Position X:</b><span>{{position.X}}</span></div>
		  <div><b>Position Y:</b><span>{{position.Y}}</span></div>
		  <div><b>Position Z:</b><span>{{position.Z}}</span></div>
		  <div><b>Orientation heading:</b><span>{{orientation.heading}}</span></div>
		  <div><b>Orientation pitch:</b><span>{{orientation.pitch}}</span></div>
		  <div><b>Orientation roll:</b><span>{{orientation.roll}}</span></div>
		  <div><b>Linear velocity X:</b><span>{{acceleration.linearVelocity.X}}</span></div>
		  <div><b>Linear velocity Y:</b><span>{{acceleration.linearVelocity.Y}}</span></div>
		  <div><b>Linear velocity Z:</b><span>{{acceleration.linearVelocity.Z}}</span></div>
		  <div><b>Angular velocity X:</b><span>{{acceleration.angularVelocity.X}}</span></div>
		  <div><b>Angular velocity Y:</b><span>{{acceleration.angularVelocity.Y}}</span></div>
		  <div><b>Angular velocity Z:</b><span>{{acceleration.angularVelocity.Z}}</span></div>
		  <div><b>Linear acceleration X:</b><span>{{acceleration.linearAcceleration.X}}</span></div>
		  <div><b>Linear acceleration Y:</b><span>{{acceleration.linearAcceleration.Y}}</span></div>
		  <div><b>Linear acceleration Z:</b><span>{{acceleration.linearAcceleration.Z}}</span></div>
		  <div><b>Angular acceleration X:</b><span>{{acceleration.angularAcceleration.X}}</span></div>
		  <div><b>Angular acceleration Y:</b><span>{{acceleration.angularAcceleration.Y}}</span></div>
		  <div><b>Angular acceleration Z:</b><span>{{acceleration.angularAcceleration.Z}}</span></div>
		</div>
		
		 <div class="cabin list">
		   <div><b>Damage:</b><span>{{Math.floor(100 * cabin.damage)}}%</span></div>
	 
		   <div><b>Position X:</b><span>{{cabin.position.X}}</span></div>
		   <div><b>Position Y:</b><span>{{cabin.position.Y}}</span></div>
		   <div><b>Position Z:</b><span>{{cabin.position.Z}}</span></div>
	 
		   <div><b>Angular velocity X:</b><span>{{cabin.acceleration.angularVelocity.X}}</span></div>
		   <div><b>Angular velocity Y:</b><span>{{cabin.acceleration.angularVelocity.Y}}</span></div>
		   <div><b>Angular velocity Z:</b><span>{{cabin.acceleration.angularVelocity.Z}}</span></div>
	 
		   <div><b>Angular acceleration X:</b><span>{{cabin.acceleration.angularAcceleration.X}}</span></div>
		   <div><b>Angular acceleration Y:</b><span>{{cabin.acceleration.angularAcceleration.Y}}</span></div>
		   <div><b>Angular acceleration Z:</b><span>{{cabin.acceleration.angularAcceleration.Z}}</span></div>
	 
		   <div><b>Offset position X:</b><span>{{cabin.offset.position.X}}</span></div>
		   <div><b>Offset position Y:</b><span>{{cabin.offset.position.Y}}</span></div>
		   <div><b>Offset position Z:</b><span>{{cabin.offset.position.Z}}</span></div>
	 
		   <div><b>Offset orientation heading:</b><span>{{cabin.offset.orientation.heading}}</span></div>
		   <div><b>Offset orientation pitch:</b><span>{{cabin.offset.orientation.pitch}}</span></div>
		   <div><b>Offset orientation roll:</b><span>{{cabin.offset.orientation.roll}}</span></div>
		 </div>
		<div class="head list">
		  <div><b>Position X:</b><span>{{head.position.X}}</span></div>
		  <div><b>Position Y:</b><span>{{head.position.Y}}</span></div>
		  <div><b>Position Z:</b><span>{{head.position.Z}}</span></div>
	
		  <div><b>Offset position X:</b><span>{{head.offset.position.X}}</span></div>
		  <div><b>Offset position Y:</b><span>{{head.offset.position.Y}}</span></div>
		  <div><b>Offset position Z:</b><span>{{head.offset.position.Z}}</span></div>
	
		  <div><b>Offset orientation heading:</b><span>{{head.offset.orientation.heading}}</span></div>
		  <div><b>Offset orientation pitch:</b><span>{{head.offset.orientation.pitch}}</span></div>
		  <div><b>Offset orientation roll:</b><span>{{head.offset.orientation.roll}}</span></div>
		</div>
		
		<div class="hook list">
		  <div><b>Position X:</b><span>{{hook.position.X}}</span></div>
		  <div><b>Position Y:</b><span>{{hook.position.Y}}</span></div>
		  <div><b>Position Z:</b><span>{{hook.position.Z}}</span></div>
		</div>
		
		<div class="engine list">
			<div><b>Oil pressure:</b><span>{{Math.round(engine.oilPressure.value)}}psi</span></div>
			<div><b>Oil Temperature:</b><span>{{Math.round(engine.oilTemperature.value)}}°C</span></div>
			<div><b>Water Temperature:</b><span>{{Math.round(engine.waterTemperature.value)}}°C</span></div>
			<div><b>Battery:</b><span>{{Math.round(engine.batteryVoltage.value)}}V</span></div>
			<div><b>RPM:</b><span>{{Math.round(engine.rpm.value)}} / {{engine.rpm.max}}</span></div>
			<div><b>Damage:</b><span>{{Math.round(100 * engine.damage)}}%</span></div>
		</div>
		
		<div class="transmission list">
			<div><b>Forward gears:</b><span>{{transmission.forwardGears}}</span></div>
			<div><b>Reverse gears:</b><span>{{transmission.reverseGears}}</span></div>
			<div><b>Current gears:</b><span>{{transmission.gear.selected}} ({{transmission.gear.displayed}})</span>
			</div>
			<div><b>Damage:</b><span>{{Math.round(100 * transmission.damage)}}%</span></div>
			<div><b>Forward gear ratios:</b><span><div v-for="ratio in transmission.gearRatiosForward.filter(ratio => ratio > 0)">{{ratio}}</div></span>
			</div>
			<div><b>Reverse gear ratios:</b><span><div v-for="ratio in transmission.gearRatiosReverse.filter(ratio => ratio < 0)">{{ratio}}</div></span>
			</div>
		</div>
		
		 <div class="differential list">
		   <div><b>Ratio:</b><span>{{differential.ratio}}</span></div>
		 </div>
		
		<div class="fluids">
			<div class="fuel">
				<div class="tank">
					<div :style="`height: ${Math.round(100 / fuel.capacity * fuel.value)}%;`"></div>
					<div>
						<div>Fuel</div>
						<div>{{Math.round(fuel.value)}}/{{fuel.capacity}} Liters</div>
						<div>{{Math.round(fuel.value * 0.2641720524)}}/{{Math.round(fuel.capacity * 0.2641720524)}}
							Gallons
						</div>
						<div>{{Math.round(100 / fuel.capacity * fuel.value)}}%</div>
					</div>
				</div>
			</div>
			&lt;!&ndash;<div class="adblue">
			  <div class="tank">
				<div :style="`height: ${Math.round(100 / adBlue.capacity * adBlue.value)}%;`"></div>
				<div>
				  <div>AdBlue</div>
				  <div>{{Math.round(adBlue.value)}}/{{adBlue.capacity}} Liters</div>
				  <div>{{Math.round(adBlue.value * 0.2641720524)}}/{{Math.round(adBlue.capacity * 0.2641720524)}} Gallons</div>
				  <div>{{Math.round(100 / adBlue.capacity * adBlue.value)}}%</div>
				</div>
			  </div>
			</div>&ndash;&gt;
		</div>
		
		<div class="brakes list">
			<div><b>Air pressure:</b><span>{{Math.round(brakes.airPressure.value)}}psi</span></div>
			<div><b>Temperature:</b><span>{{Math.round(brakes.temperature.value)}}°C</span></div>
			<div><b>Parking brake enabled:</b><span>{{brakes.parking.enabled ? 'YES' : 'NO'}}</span></div>
			<div><b>Motor brake enabled:</b><span>{{brakes.motor.enabled ? 'YES' : 'NO'}}</span></div>
			<div><b>Retarder steps:</b><span>{{brakes.retarder.steps}}</span></div>
			<div><b>Retarder level:</b><span>{{brakes.retarder.level}}</span></div>
		</div>
		
		<div class="lights list">
		  <div><b>Dashboard backlight:</b><span :class="`light lit-${['blank', 'yellow', 'white'][lights.dashboardBacklight]}`"></span></div>
		  <div><b>AUX Front:</b><span           :class="`light lit-${['blank', 'yellow', 'white'][lights.auxFront.value]}`"></span></div>
		  <div><b>AUX Roof:</b><span            :class="`light lit-${['blank', 'yellow', 'white'][lights.auxRoof.value]}`"></span></div>
		  <div><b>Blink left:</b><span          :class="`light lit-${['blank', 'green'][lights.blinker.left.active ? 1 : 0]}`"></span></div>
		  <div><b>Blink right:</b><span         :class="`light lit-${['blank', 'green'][lights.blinker.right.active ? 1 : 0]}`"></span></div>
		  <div><b>Parking:</b><span             :class="`light lit-${['blank', 'yellow'][lights.parking.enabled ? 1 : 0]}`"></span></div>
		  <div><b>Low beam:</b><span            :class="`light lit-${['blank', 'white'][lights.beamLow.enabled ? 1 : 0]}`"></span></div>
		  <div><b>High beam:</b><span           :class="`light lit-${['blank', 'white'][lights.beamHigh.enabled ? 1 : 0]}`"></span></div>
		  <div><b>Beacon:</b><span              :class="`light lit-${['blank', 'yellow'][lights.beacon.enabled ? 1 : 0]}`"></span></div>
		  <div><b>Brake:</b><span               :class="`light lit-${['blank', 'red'][lights.brake.enabled ? 1 : 0]}`"></span></div>
		  <div><b>Reverse:</b><span             :class="`light lit-${['blank', 'yellow'][lights.reverse.enabled ? 1 : 0]}`"></span></div>
		</div>
		
		<div class="wheels">
		  <Wheel v-for="wheel, i in wheels" v-bind="{...wheel, id: i+1}"/>
		</div>
		
		<div class="damages list">
			<div class="damage" v-for="key in Object.keys(damage)">
				<b>{{key}}</b>
				<div>{{Math.round(100 * damage[key])}}%</div>
			</div>
		</div>-->
	</div>
</template>

<script>
	import Wheel    from '@/components/Wheel.vue';
	import Window   from '@/components/Window.vue';
	import utilsApp from '../utils/_app';
	
	export default {
		name: 'Truck',
		
		components: { Window, Wheel },
		
		mixins: [ utilsApp ],
		
		props: [
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
				const elementLength = this.$parent.$elementsLength( 'right' );
				const maxElement    = this.$parent.maxSideElements;
				const diff          = maxElement - elementLength;
				
				//console.log( elementLength, maxElement, diff, this.currentEnabled );
				
				return (diff <= 0)
					? 0
					: diff;
			},
			elementIsEnabled:  function ( element ) {
				return  this.$parent.$elementIsEnabled( 'right', element );
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../assets/scss/truck/truck";
	
	.truck {
		.t-info {
			display: flex;
			justify-content: space-between;
			text-align: right;
			
			.theTruk {
				display: flex;
				width: 100%;
				justify-content: space-between;
				flex-direction: column;
				min-height: 4.5rem;
				padding: 0 0 0.5rem 0;
			}
			
			.truck-data, .truck-stats, .truck-gear {
				
				/*width: 100%;*/
				padding: 0 1rem;
				display: flex;
				justify-content: space-between;
				
				> * {
					display: block;
				}
			}
			
			.truck-stats {
				/*width: auto;*/
				> span {
					width: 100%;
					font-size: 1rem;
					text-align: center
				}
			}
			
			.truck-data {
				> * {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 1rem;
				}
				
				.brand {
					width: 2rem;
					max-height: 24px;
					margin-right: 0.5rem;
				}
			}
			
		}
		
	}
</style>
