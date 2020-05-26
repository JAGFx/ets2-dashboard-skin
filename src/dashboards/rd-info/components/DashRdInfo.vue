<template>
	<Dashboard class="rd-info wrapper" v-slot:default="dashProps">
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
				<!--<CadranElement v-bind="{
					'classCSS': 'truck-speed',
					'type': 'meter',
					'value': $truckSpeed(),
					'min': 0,
					'max': 120,
					'minAngle' : -111,
					'maxAngle': 110,
				}"></CadranElement>-->
				<!--				<div class="truck-speedRounded wrapper-area"><span>{{ truck.speed.kph }}</span></div>-->
				<!--<CadranElement v-bind="{
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
				}"></CadranElement>-->
				<!--<CadranElement v-bind="{
					'classCSS': 'truck-waterTemperature',
					'type': 'meter',
					'value': truck.engine.waterTemperature.value,
					'min': -48,
					'max': 100,
					'minAngle' : -48,
					'maxAngle': 13,
				}"></CadranElement>-->
				<!--<CadranElement v-bind="{
					'classCSS': 'truck-airPressure',
					'type': 'meter',
					'value': truck.engine.waterTemperature.value,
					'min': 0,
					'max': 200,
					'minAngle' : -103,
					'maxAngle': 111,
				}"></CadranElement>-->
				
				<div class="truck-wearEngine wrapper-area"><span>{{ ( truck.damage.engine * 100).toFixed(0) }}%</span>
				</div>
				<div class="truck-wearTransmission wrapper-area"><span>{{ ( truck.damage.transmission * 100).toFixed(0) }}%</span>
				</div>
				<div class="truck-wearCabin wrapper-area"><span>{{ ( truck.damage.cabin * 100).toFixed(0) }}%</span>
				</div>
				<div class="truck-wearWheels wrapper-area"><span>{{ ( truck.damage.wheels * 100).toFixed(0) }}%</span>
				</div>
				<div class="truck-wearChassis wrapper-area"><span>{{ ( truck.damage.chassis * 100).toFixed(0) }}%</span>
				</div>
				<div class="trailer-wear wrapper-area"><span>{{ (trailer.cargo.damage * 100).toFixed(0) }} %</span>
				</div>
				<div class="truck-make wrapper-area"><span>{{ truck.brand.name }}</span></div>
				<div :class="{ 'yes': truck.lights.beamHigh.enabled }" class="truck-lightsBeamHighOn"></div>
				<div :class="{ 'yes': truck.lights.beamLow.enabled }" class="truck-lightsBeamLowOn"></div>
				<div :class="{ 'yes': truck.lights.parking.enabled }" class="truck-lightsParkingOn"></div>
				<div :class="{ 'yes': truck.cruiseControl.enabled }" class="truck-cruiseControlOn"></div>
				<div :class="{ 'yes': truck.brakes.parking.enabled }" class="truck-parkBrakeOn"></div>
				<div :class="{ 'yes': truck.brakes.airPressure.warning.enabled }" class="_airPressureOn"></div>
				<div class="truck-fuel">{{ truck.fuel.value }}</div>
				<div class="truck-fuelAverageConsumption">{{ (truck.fuel.avgConsumption * 100).toFixed(1) }}</div>
				<div class="_fuelAvg">L/100</div>
				<div :style="{ width: ( controls.game.brake * 606) + 'px' }" class="_gameBrakeBar"></div>
				<div :style="{ width: ( controls.input.brake * 606)  + 'px'}" class="_userBrakeBar"></div>
				<div :style="{ width: ( controls.game.throttle * 606) + 'px' }" class="_gameThrottleBar"></div>
				<div :style="{ width: ( controls.input.throttle * 606) + 'px' }" class="_userThrottleBar"></div>
				<!--				<div :class="{ 'yes': truck.lights.beacon.enabled }" class="truck-lightsBeaconOn"></div>-->
				<div :class="{ 'yes': ( truck.lights.blinker.left.active || truck.lights.blinker.right.active ) }" class="_dangerWarning"></div>
				<div :class="{ 'yes': truck.lights.parking.enabled }" class="_auxLights"></div>
				<div :class="{ 'yes': ( truck.lights.auxFront.value !== 0 || truck.lights.auxRoof.value !== 0 ) }" class="truck-lightsParkingOn"></div>
				<div class="navigation-speedLimit">{{ navigation.speedLimit.kph }}</div>
				
				<!--				<div class="truck-odometer wrapper-area"><span>{{ truck.odometer.toFixed(0) }}</span></div>-->
				<!--				<div class="truck-cruiseControlSpeedRounded wrapper-area"><span>{{ truck.cruiseControl.kph }}</span></div>-->
				<div class="truck-displayedGear wrapper-area">
					<span>{{ $trukGear( truck.transmission, truck.brand ) }}</span>
				</div>
				<!-- indicators -->
				<!--				<div :class="{ 'yes': truck.lights.blinker.left.active}" class="truck-blinkerLeftOn"></div>-->
				<!--				<div :class="{ 'yes': truck.lights.blinker.right.active }" class="truck-blinkerRightOn"></div>-->
				
				<div class="job-remainingTime wrapper-area"><span>{{ job.deliveryTime.unix | $dateTimeLocalized( DATE_FORMAT_SHORT, TIME_FORMAT_SHORT ) }}</span>
				</div>
				<div class="job-sourceCity wrapper-area"><span>{{ job.source.city.name }}</span></div>
				<div class="job-destinationCity wrapper-area"><span>{{ job.destination.city.name }}</span></div>
				<div class="_jobIncome wrapper-area"><span>&euro;<span class="job-income">{{ job.income.toLocaleString() }}</span></span>
				</div>
				<div class="trailer-name wrapper-area"><span>{{ trailer.model.name }}</span></div>
				
				<!--				<div :class="{'yes': trailer.attached}" class="trailer-attached"></div>-->
				<!--				<div class="trailer-mass wrapper-area">-->
				<!--					<span>{{ (job.cargo.mass / 1000).toFixed(1) }}<span class="ton">t</span></span></div>-->
				<!--				<div class="trailer-name">{{ job.cargo.name }}</div>-->
				<!--				<div :class="{ 'yes': truck.fuel.warning.enabled }" class="truck-fuelWarningOn"></div>-->
				<!--				<div :class="{ 'yes': truck.brakes.airPressure.warning.enabled }" class="truck-airPressureWarningOn"></div>-->
				
				<!--				<div class="truck-retarderBrake">{{ truck.brakes.retarder.level > 0 ? 'On' : 'Off' }}</div>-->
				<!--				<div class="truck-oilTemperature">{{ truck.engine.oilTemperature.value.toFixed(0) }}</div>-->
				<!--				<div class="truck-batteryVoltage">{{ truck.engine.batteryVoltage.warning.factor.toFixed(0) }}</div>-->
				<!--				<div class="game-time wrapper-area"><span>{{ $formatDate( $telemetryData().game.time.unix ) }}</span></div>-->
				<!--				<div :class="{ 'yes': truck.brakes.airPressure.emergency.enabled }" class="truck-airPressureEmergencyOn"></div>-->
			</div>
		</div>
	</Dashboard>
</template>

<script>
	import Dashboard  from '../../../components/Elements/Dashboard';
	import dashMixins from '../../../components/Mixins/dashMixins';
	
	export default {
		name:       'DashRdInfo',
		components: {
			Dashboard
		},
		mixins:     [ dashMixins ],
		methods:    {}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/rd-info";
</style>
