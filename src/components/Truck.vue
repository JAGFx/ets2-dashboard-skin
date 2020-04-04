<template>
	<div class="truck">
		<div class="t-info">
			<div class="theTruk">
				<div class="truck-stats">
					<span>
					  {{Math.round(odometer).toLocaleString()}} KM
					</span>
					<span>
					  {{(fuel.avgConsumption * 100).toFixed(1)}} l/100km
					</span>
					<div class="damage">
						<span>{{Math.floor(100 * chassis.damage)}}%</span>
					</div>
				</div>
				<div class="truck-data">
					<span>{{brand.name}}</span>
					<small>{{model.name}}</small>
					<span class="truck-plate"><span class="flag">{{getFlag()}}</span>{{licensePlate.value}}</span>
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
		
		<ul class="info">
			<li>
				<span>{{Math.round(engine.oilTemperature.value)}} °C</span>
				<div class="round">
					<img src="../assets/Truck/noun_Oil_497867.svg" alt="">
				</div>
			</li>
			<li>
				<span>{{Math.round(brakes.temperature.value)}} °C</span>
				<div class="round">
					<img src="../assets/Truck/noun_Brake_light_457498.svg" alt="">
				</div>
			</li>
			<li>
				<span>{{Math.round(brakes.airPressure.value)}} psi</span>
				<div class="round"></div>
			</li>
			<li>
				<span>{{Math.round(fuel.value)}} L</span>
				<div class="round">
					<img src="../assets/Truck/noun_Fuel_38066.svg" alt="">
				</div>
			</li>
			<li>
				<span>{{cruiseControl.enabled ? cruiseControl.speed : 'OFF'}}</span>
				<div class="round">
					<img src="../assets/Truck/noun_Cruise_Control_On_457475.svg" alt="">
				</div>
			</li>
			<li>
				<span>{{Math.round(engine.waterTemperature.value)}} °C</span>
				<div class="round">
					<img src="../assets/Truck/noun_Water_Temperature_507610.svg" alt="">
				</div>
			</li>
			<li>
				<span>{{Math.round(engine.batteryVoltage.value)}} V</span>
				<div class="round">
					<img src="../assets/Truck/noun_Battery_1909381.svg" alt="">
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
	import Wheel  from '@/components/Wheel.vue';
	import Window from '@/components/Window.vue';
	
	export default {
		name: 'Truck',
		
		components: { Window, Wheel },
		
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
		
		data: function () {
			return {};
		},
		
		methods: {
			getFlag: function () {
				switch ( this.licensePlate.country.id ) {
					case 'norway':
						return  '🇳🇴';
						break;
					case 'france':
						return '🇫🇷';
						break;
					default:
						return '🏳️';
						break;
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.truck {
		.t-info {
			display: flex;
			justify-content: space-between;
			text-align: right;
			
			.theTruk {
				display: flex;
				width: 100%;
				justify-content: space-between;
				min-height: 5rem;
				max-height: 6rem;
			}
			
			.truck-data, .truck-stats, .truck-gear {
				
				/*width: 100%;*/
				padding: 0 1rem 0.5rem;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				
				.truck-plate {
					padding: 0 .2rem 0 0;
					background: var(--color-red);
					color: var(--color-bg);
					font-size: .9rem;
					display: inline-flex;
					
					.flag {
						padding: 0 .2rem;
						margin-right: .2rem;
						background: var(--color-window);
						color: var(--color-text);
						height: 100%;
					}
				}
				
				> * {
					display: block;
					
				}
			}
			
			.truck-stats {
				width: auto;
				> span	{ font-size: .9rem; text-align: center }
				
				.damage{
					background: #ff0000;
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: .9rem;
					
					> * {
						display: block;
						width: 100%;
						padding: 0 .7rem;
						text-align: center;
					}
				}
			}
			
		}
		
		/*.truck-wear {
			width: 100%;
			background: #ff0000;
			color: #000;
			display: flex;
			justify-content: center;
			
			align-items: center;
			font-size: .8rem;
			
			
			> .damage{
				width: 100%;
				display: flex;
				!*flex-direction: column;*!
				justify-content: space-around;
				
				> * { display: block; width: 100%; padding: 0 .7rem; }
			}
		}*/
		
		.info {
			padding-right: .5rem;
			margin: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			li {
				list-style: none;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin: .2rem 0;
				position: relative;
				background: linear-gradient( to left, var(--color-border), var(--color-bg) );
				
				span { font-size: 1.2rem; text-align: right; }
				
				@for $i from 1 through 8 {
					&:nth-child(#{$i}) {
						margin-right: ( $i - 1 ) * 1rem;
					}
				}
				
				&:after  {
					content: ' ';
					width: 1rem;
					height: 2.5rem;
					background: var(--color-bg);
					border: 1px solid var(--color-red);
					border-width: 0 0 0 1px;
					transform-origin: bottom left;
					transform: skew(-20deg, 0deg);
				}
			}
			
			.round{
				width: 2.5rem;
				height: 2.5rem;
				overflow: hidden;
				margin-left: 1rem;
			}
		}
		
	}
	
	
	.fluids,
	.fuel,
	.tank,
	.adBlue {
		height: 100%;
	}
	
	
	.fluids {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: var(--spacing);
	}
	
	.tank {
		position: relative;
		display: grid;
		justify-items: center;
		align-items: center;
		border: 2px solid var(--color-white);
		
		> div:nth-child(1) {
			position: absolute;
			background-color: var(--color-red);
			bottom: 0;
			width: 100%;
		}
		
		> div:nth-child(2) {
			background-color: black;
			display: grid;
			text-align: center;
			z-index: 10;
			padding: 5px;
			grid-gap: 5px;
		}
	}
	
	.fuel .tank > div:nth-child(1) {
		background-color: var(--color-green);
	}
	
	.adblue .tank > div:nth-child(1) {
		background-color: var(--color-blue);
	}
	
	.light {
		background-color: var(--color-black);
		border: 2px solid white;
		width: 11px;
		height: 11px;
		border-radius: 50%;
	}
	
	.lit-white {
		background-color: var(--color-white);
	}
	
	.lit-yellow {
		background-color: var(--color-yellow);
	}
	
	.lit-green {
		background-color: var(--color-green);
	}
	
	.lit-red {
		background-color: var(--color-red);
	}
	
	.wheels {
		display: grid;
		justify-items: center;
		grid-gap: var(--spacing);
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
	}
</style>
