<template>
	<Dashboard class="volvo-fh wrapper" v-slot:default="dashProps">
		<div class="dashboard game-connected yes" v-bind:style="{
			transform: 'scale(' + $scale( dashProps.skinData ) + ') translate(-50%, -50%)',
			width: dashProps.skinData.size.width + 'px',
			height: dashProps.skinData.size.height + 'px',
		}">
			<div :class="{'yes': telemetry.job.cargo.id}" class="hasJob">
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
					'value': telemetry.truck.speed.kph,
					'min': 20,
					'max': 120,
					'minAngle' : -97,
					'maxAngle': 97,
				}"></CadranElement>
				<div class="truck-speedRounded wrapper-area"><span>{{ unit_speed( telemetry.truck.speed, true, false ) }}</span>
				</div>
				<CadranElement v-bind="{
					'classCSS': 'truck-engineRpm',
					'type': 'meter',
					'value': telemetry.truck.engine.rpm.value / 100,
					'min': 4,
					'max': 25,
					'minAngle' : -65,
					'maxAngle': 58,
				}"></CadranElement>
				<!--<CadranElement v-bind="{
					'classCSS': 'truck-fuel',
					'type': 'meter',
					'value': 700,//telemetry.truck.fuel.value,
					'min': 0,
					'max': telemetry.truck.fuel.capacity,
					'minAngle' : -53,
					'maxAngle': 53,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-waterTemperature',
					'type': 'meter',
					'value': telemetry.truck.engine.waterTemperature.value,
					'min': 40,
					'max': 100,
					'minAngle' : -55,
					'maxAngle': 40,
				}"></CadranElement>
				<CadranElement v-bind="{
					'classCSS': 'truck-oilPressure',
					'type': 'meter',
					'value': $pressureToBar(telemetry.truck.engine.oilPressure.value),
					'min': 0,
					'max': 8,
					'minAngle' : -53,
					'maxAngle': 53,
				}"></CadranElement>-->
				<div class="truck-odometer wrapper-area"><span>{{ unit_length( telemetry.truck.odometer, 'km', true, false ) | $toFixed( 0 ) }}</span>
				</div>
				<!--				<div class="truck-cruiseControlSpeedRounded wrapper-area"><span>{{ telemetry.truck.cruiseControl.kph }}</span></div>-->
				<div class="truck-gear wrapper-area"><span>{{ $trukGear( telemetry.truck.transmission, telemetry.truck.brand ) }}</span>
				</div>
				<!-- indicators -->
				<div :class="{ 'yes': telemetry.truck.lights.blinker.left.active}" class="truck-blinkerLeftOn"></div>
				<div :class="{ 'yes': telemetry.truck.lights.blinker.right.active }" class="truck-blinkerRightOn"></div>
				<div :class="{ 'yes': telemetry.truck.cruiseControl.enabled }" class="truck-cruiseControlOn"></div>
				<div :class="{ 'yes': telemetry.truck.lights.beamHigh.enabled }" class="truck-lightsBeamHighOn"></div>
				<div :class="{ 'yes': telemetry.truck.lights.beamLow.enabled }" class="truck-lightsBeamLowOn"></div>
				<div :class="{ 'yes': telemetry.truck.lights.parking.enabled }" class="truck-lightsParkingOn"></div>
				<div :class="{'yes': telemetry.trailer.attached}" class="trailer-attached"></div>
				<div class="trailer-mass wrapper-area">
					<span>{{ unit_weight( telemetry.job.cargo.mass, true, false ) | $toFixed( 1 ) }}<span class="ton">{{ unit_weight( telemetry.job.cargo.mass, false ) }}</span></span>
				</div>
				<div class="trailer-name">{{ telemetry.job.cargo.name }}</div>
				<div class="game-time wrapper-area"><span>{{ $gameTime() | $dateTimeLocalized( DATE_FORMAT_SHORT, TIME_FORMAT_SHORT ) }}</span>
				</div>
				<div :class="{ 'yes': telemetry.truck.brakes.parking.enabled }" class="truck-parkBrakeOn"></div>
				<div :class="{ 'yes': telemetry.truck.brakes.airPressure.warning.enabled }" class="truck-airPressureWarningOn"></div>
				<div class="truck-retarderBrake wrapper-area"><span>{{ telemetry.truck.brakes.retarder.level }}</span>
				</div>
				<div class="truck-waterTemperature">{{ unit_degrees( telemetry.truck.engine.waterTemperature.value )
					}}
				</div>
				<div class="truck-oilTemperature">{{ unit_degrees( telemetry.truck.engine.oilTemperature.value ) }}
				</div>
				<div class="truck-batteryVoltage">{{ telemetry.truck.engine.batteryVoltage.warning.factor.toFixed(0)
					}}
				</div>
				<!--				<div :class="{ 'yes': telemetry.truck.brakes.airPressure.emergency.enabled }" class="truck-airPressureEmergencyOn"></div>-->
				<div :class="{ 'yes': telemetry.truck.fuel.warning.enabled }" class="truck-fuelWarningOn"></div>
			
			
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
