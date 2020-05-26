<template>
	<Dashboard class="mercedes-atego wrapper" v-slot:default="dashProps">
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
					'value': $truckSpeed(),
					'min': 0,
					'max': 120,
					'minAngle' : -111,
					'maxAngle': 110,
				}"></CadranElement>
				<div class="truck-speedRounded wrapper-area"><span>{{ truck.speed.kph }}</span></div>
				<CadranElement v-bind="{
					'classCSS': 'truck-engineRpm',
					'type': 'meter',
					'value': truck.engine.rpm.value / 100,
					'min': 0,
					'max': 30,
					'minAngle' : -111,
					'maxAngle': 112,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-fuel',
					'type': 'meter',
					'value': truck.fuel.value,
					'min': 0,
					'max': truck.fuel.capacity,
					'minAngle' : -103,
					'maxAngle': 103,
				}"></CadranElement>
				<!--<CadranElement v-bind="{
					'classCSS': 'truck-waterTemperature',
					'type': 'meter',
					'value': truck.engine.waterTemperature.value,
					'min': -48,
					'max': 100,
					'minAngle' : -48,
					'maxAngle': 13,
				}"></CadranElement>-->
				<CadranElement v-bind="{
					'classCSS': 'truck-airPressure',
					'type': 'meter',
					'value': $pressureToBar(truck.brakes.airPressure.value),
					'min': 0,
					'max': 12,
					'minAngle' : -103,
					'maxAngle': 105,
				}"></CadranElement>
				<div class="truck-odometer wrapper-area"><span>{{ truck.odometer.toFixed(0) }}</span></div>
				<!--				<div class="truck-cruiseControlSpeedRounded wrapper-area"><span>{{ truck.cruiseControl.kph }}</span></div>-->
				<div class="truck-gear wrapper-area"><span>{{ $trukGear( truck.transmission, truck.brand ) }}</span>
				</div>
				<!-- indicators -->
				<div :class="{ 'yes': truck.lights.blinker.left.active}" class="truck-blinkerLeftOn"></div>
				<div :class="{ 'yes': truck.lights.blinker.right.active }" class="truck-blinkerRightOn"></div>
				<!--				<div :class="{ 'yes': truck.cruiseControl.enabled }" class="truck-cruiseControlOn"></div>-->
				<div :class="{ 'yes': truck.lights.beamHigh.enabled }" class="truck-lightsBeamHighOn"></div>
				<div :class="{ 'yes': truck.lights.beamLow.enabled }" class="truck-lightsBeamLowOn"></div>
				<div :class="{ 'yes': truck.lights.parking.enabled }" class="truck-lightsParkingOn"></div>
				<div :class="{'yes': trailer.attached}" class="trailer-attached"></div>
				<!--				<div class="trailer-mass wrapper-area">-->
				<!--					<span>{{ (job.cargo.mass / 1000).toFixed(1) }}<span class="ton">t</span></span></div>-->
				<!--				<div class="trailer-name">{{ job.cargo.name }}</div>-->
				<div :class="{ 'yes': truck.fuel.warning.enabled }" class="truck-fuelWarningOn"></div>
				<div :class="{ 'yes': truck.brakes.airPressure.warning.enabled }" class="truck-airPressureWarningOn"></div>
				<div :class="{ 'yes': truck.brakes.parking.enabled }" class="truck-parkBrakeOn"></div>
				<div class="truck-retarderBrake">{{ truck.brakes.retarder.level > 0 ? 'On' : 'Off' }}</div>
				<!--				<div class="truck-oilTemperature">{{ truck.engine.oilTemperature.value.toFixed(0) }}</div>-->
				<!--				<div class="truck-batteryVoltage">{{ truck.engine.batteryVoltage.warning.factor.toFixed(0) }}</div>-->
				<div class="game-time wrapper-area"><span>{{ game.time.unix | $dateTimeLocalized( DATE_FORMAT_SHORT, TIME_FORMAT_SHORT ) }}</span>
				</div>
				<!--				<div :class="{ 'yes': truck.brakes.airPressure.emergency.enabled }" class="truck-airPressureEmergencyOn"></div>-->
			</div>
		</div>
	</Dashboard>
</template>

<script>
	import CadranElement from '../../../components/Elements/CadranElement';
	import Dashboard     from '../../../components/Elements/Dashboard';
	import dashMixins    from '../../../components/Mixins/dashMixins';
	
	export default {
		name:       'DashMercedesAtego',
		components: {
			Dashboard,
			CadranElement
		},
		mixins:     [ dashMixins ],
		methods:    {}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/mercedes-atego";
</style>
