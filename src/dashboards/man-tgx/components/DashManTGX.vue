<template>
	<Dashboard class="man-tgx wrapper" v-slot:default="dashProps">
		<div class="dashboard game-connected yes" v-bind:style="{
			transform: 'scale(' + $scale( dashProps.skinData ) + ') translate(-50%, -50%)'
		}">
			<div :class="{'yes': dashProps.job.cargo.id}" class="hasJob">
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
					'value': $truckSpeed(),
					'min': 0,
					'max': 125,
					'minAngle' : -123,
					'maxAngle': 105,
				}"></CadranElement>
				<div class="truck-speedRounded wrapper-area"><span>{{ dashProps.truck.speed.kph }}</span></div>
				<CadranElement v-bind="{
					'classCSS': 'truck-engineRpm',
					'type': 'meter',
					'value': dashProps.truck.engine.rpm.value / 100,
					'min': 2,
					'max': 30,
					'minAngle' : -127,
					'maxAngle': 97,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-fuel',
					'type': 'meter',
					'value': dashProps.truck.fuel.value,
					'min': 0,
					'max': dashProps.truck.fuel.capacity,
					'minAngle' : -28,
					'maxAngle': 30,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-waterTemperature',
					'type': 'meter',
					'value': dashProps.truck.engine.waterTemperature.value,
					'min': -48,
					'max': 100,
					'minAngle' : -48,
					'maxAngle': 13,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-airPressure',
					'type': 'meter',
					'value': dashProps.truck.engine.waterTemperature.value,
					'min': -48,
					'max': 100,
					'minAngle' : -56,
					'maxAngle': 10,
				}"></CadranElement>
				<div class="truck-odometer wrapper-area"><span>{{ dashProps.truck.odometer.toFixed(0) }}</span></div>
				<!--				<div class="truck-cruiseControlSpeedRounded wrapper-area"><span>{{ dashProps.truck.cruiseControl.kph }}</span></div>-->
				<div class="truck-gear wrapper-area"><span>{{ $trukGear( dashProps.truck.transmission, dashProps.truck.brand ) }}</span>
				</div>
				<!-- indicators -->
				<div :class="{ 'yes': dashProps.truck.lights.blinker.left.active}" class="truck-blinkerLeftOn"></div>
				<div :class="{ 'yes': dashProps.truck.lights.blinker.right.active }" class="truck-blinkerRightOn"></div>
				<div :class="{ 'yes': dashProps.truck.cruiseControl.enabled }" class="truck-cruiseControlOn"></div>
				<div :class="{ 'yes': dashProps.truck.lights.beamHigh.enabled }" class="truck-lightsBeamHighOn"></div>
				<div :class="{ 'yes': dashProps.truck.lights.beamLow.enabled }" class="truck-lightsBeamLowOn"></div>
				<div :class="{ 'yes': dashProps.truck.lights.parking.enabled }" class="truck-lightsParkingOn"></div>
<!--				<div :class="{'yes': dashProps.trailer.attached}" class="trailer-attached"></div>-->
				<div class="trailer-mass wrapper-area">
					<span>{{ (dashProps.job.cargo.mass / 1000).toFixed(1) }}<span class="ton">t</span></span></div>
				<div :class="{ 'yes': dashProps.truck.brakes.parking.enabled }" class="truck-parkBrakeOn"></div>
				<div :class="{ 'yes': dashProps.truck.brakes.airPressure.warning.enabled }" class="truck-airPressureWarningOn"></div>
				<div class="truck-retarderBrake">{{ dashProps.truck.brakes.retarder.level > 0 ? 'On' : 'Off' }}</div>
				<div class="truck-oilTemperature">{{ dashProps.truck.engine.oilTemperature.value.toFixed(0) }}</div>
				<div class="truck-batteryVoltage">{{ dashProps.truck.engine.batteryVoltage.warning.factor.toFixed(0) }}</div>
				<div class="game-time wrapper-area"><span>{{ $formatDate( $telemetryData().game.time.unix ) }}</span></div>
				<div :class="{ 'yes': dashProps.truck.brakes.airPressure.emergency.enabled }" class="truck-airPressureEmergencyOn"></div>
			</div>
		</div>
	</Dashboard>
</template>

<script>
	import CadranElement from '../../../components/Elements/CadranElement';
	import Dashboard     from '../../../components/Elements/Dashboard';
	import dashMixins    from '../../../components/Mixins/dashMixins';
	
	export default {
		name:       'DashManTGX',
		components: {
			Dashboard,
			CadranElement
		},
		mixins:     [ dashMixins ],
		methods:    {}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/man-tgx";
</style>
