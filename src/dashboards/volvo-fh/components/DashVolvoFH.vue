<template>
	<Dashboard class="volvo-fh wrapper" v-slot:default="dashProps">
		<div class="dashboard game-connected yes" v-bind:style="{
			transform: 'scale(' + $scale( dashProps.skinData ) + ') translate(-50%, -50%)',
			width: dashProps.skinData.size.width + 'px',
			height: dashProps.skinData.size.height + 'px',
		}">
			<div :class="{'yes': job.cargo.id}" class="hasJob">
				<!-- meters -->
				<!--
					Attributes:
					data-min-angle: angle in degress for the arrow for data-min value (0 = vertical, negative = left, positive = right)
					data-max-angle: an gle in degress for the arrow for data-max value (0 = vertical, negative = left, positive = right)
					data-min: minimal possible value (as in JSON response), you may also use any telemetry property name for dynamic values
					data-max: maximum possible value (as in JSON response), you may also use any telemetry property name for dynamic values
					-->
				<CadranElement v-bind="{
					'classCSS': 'truck-speed',
					'type': 'meter',
					'value': truck.speed.kph,
					'min': 20,
					'max': 120,
					'minAngle' : -97,
					'maxAngle': 97,
				}"></CadranElement>
				<div class="truck-speedRounded wrapper-area"><span>{{ truck.speed | unit_speed( true, false ) }}</span></div>
				<CadranElement v-bind="{
					'classCSS': 'truck-engineRpm',
					'type': 'meter',
					'value': truck.engine.rpm.value / 100,
					'min': 4,
					'max': 25,
					'minAngle' : -65,
					'maxAngle': 58,
				}"></CadranElement>
				<!--<CadranElement v-bind="{
					'classCSS': 'truck-fuel',
					'type': 'meter',
					'value': 700,//truck.fuel.value,
					'min': 0,
					'max': truck.fuel.capacity,
					'minAngle' : -53,
					'maxAngle': 53,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-waterTemperature',
					'type': 'meter',
					'value': truck.engine.waterTemperature.value,
					'min': 40,
					'max': 100,
					'minAngle' : -55,
					'maxAngle': 40,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-oilPressure',
					'type': 'meter',
					'value': $pressureToBar(truck.engine.oilPressure.value),
					'min': 0,
					'max': 8,
					'minAngle' : -53,
					'maxAngle': 53,
				}"></CadranElement>-->
				<div class="truck-odometer wrapper-area"><span>{{ truck.odometer | unit_length( 'km', true, false ) | $toFixed( 0 ) }}</span></div>
				<!--				<div class="truck-cruiseControlSpeedRounded wrapper-area"><span>{{ truck.cruiseControl.kph }}</span></div>-->
				<div class="truck-gear wrapper-area"><span>{{ $trukGear( truck.transmission, truck.brand ) }}</span>
				</div>
				<!-- indicators -->
				<div :class="{ 'yes': truck.lights.blinker.left.active}" class="truck-blinkerLeftOn"></div>
				<div :class="{ 'yes': truck.lights.blinker.right.active }" class="truck-blinkerRightOn"></div>
				<div :class="{ 'yes': truck.cruiseControl.enabled }" class="truck-cruiseControlOn"></div>
				<div :class="{ 'yes': truck.lights.beamHigh.enabled }" class="truck-lightsBeamHighOn"></div>
				<div :class="{ 'yes': truck.lights.beamLow.enabled }" class="truck-lightsBeamLowOn"></div>
				<div :class="{ 'yes': truck.lights.parking.enabled }" class="truck-lightsParkingOn"></div>
				<div :class="{'yes': trailer.attached}" class="trailer-attached"></div>
				<div class="trailer-mass wrapper-area">
					<span>{{ job.cargo.mass | unit_weight( true, false ) | $toFixed( 1 ) }}<span class="ton">{{ job.cargo.mass | unit_weight(  false ) }}</span></span></div>
								<div class="trailer-name">{{ job.cargo.name }}</div>
				<div class="game-time wrapper-area"><span>{{ game.time.unix | $dateTimeLocalized( DATE_FORMAT_SHORT, TIME_FORMAT_SHORT ) }}</span>
				</div>
				<div :class="{ 'yes': truck.brakes.parking.enabled }" class="truck-parkBrakeOn"></div>
				<div :class="{ 'yes': truck.brakes.airPressure.warning.enabled }" class="truck-airPressureWarningOn"></div>
				<div class="truck-retarderBrake wrapper-area"><span>{{ truck.brakes.retarder.level }}</span></div>
				<div class="truck-waterTemperature">{{ truck.engine.waterTemperature.value | unit_degrees }}</div>
				<div class="truck-oilTemperature">{{ truck.engine.oilTemperature.value | unit_degrees }}</div>
				<div class="truck-batteryVoltage">{{ truck.engine.batteryVoltage.warning.factor.toFixed(0) }}</div>
<!--				<div :class="{ 'yes': truck.brakes.airPressure.emergency.enabled }" class="truck-airPressureEmergencyOn"></div>-->
				<div :class="{ 'yes': truck.fuel.warning.enabled }" class="truck-fuelWarningOn"></div>
				
				
			</div>
		</div>
	</Dashboard>
</template>

<script>
	import CadranElement from '../../../components/Elements/CadranElement';
	import Dashboard     from '../../../components/Elements/Dashboard';
	import AppDashMixins    from '../../../components/Mixins/AppDashMixins';
	
	export default {
		name:       'DashVolvoFH',
		components: {
			Dashboard,
			CadranElement
		},
		mixins:     [ AppDashMixins ]
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/volvo-fh";
</style>
