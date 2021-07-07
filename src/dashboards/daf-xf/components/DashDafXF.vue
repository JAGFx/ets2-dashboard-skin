<template>
	<Dashboard class="daf-xf wrapper" v-slot:default="dashProps">
		<div class="dashboard game-connected yes" v-bind:style="{
			transform: 'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
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
        <Cadran v-bind="{
					'classCSS': 'truck-speed',
					'type': 'meter',
					'value': telemetry.truck.speed.kph,
					'min': 0,
					'max': 140,
					'minAngle' : -121,
					'maxAngle': 92,
				}"></Cadran>
        <div class="truck-speedRounded wrapper-area"><span>{{
            unit_speed( telemetry.truck.speed,
                true,
                false ) | $toFixed( 0 )
          }}</span>
        </div>
        <Cadran v-bind="{
					'classCSS': 'truck-engineRpm',
					'type': 'meter',
					'value': telemetry.truck.engine.rpm.value / 100,
					'min': 5,
					'max': 25,
					'minAngle' : -88,
					'maxAngle': 125,
				}"></Cadran>
        <Cadran v-bind="{
					'classCSS': 'truck-fuel',
					'type': 'meter',
					'value': telemetry.truck.fuel.value,
					'min': 0,
					'max': telemetry.truck.fuel.capacity,
					'minAngle' : -56,
					'maxAngle': -120,
				}"></Cadran>
        <Cadran v-bind="{
					'classCSS': 'truck-waterTemperature',
					'type': 'meter',
					'value': telemetry.truck.engine.waterTemperature.value,
					'min': 0,
					'max': 100,
					'minAngle' : -120,
					'maxAngle': -57,
				}"></Cadran>
        <div class="truck-odometer wrapper-area"><span>{{
            unit_length( telemetry.truck.odometer,
                'km',
                true,
                false ) | $toFixed( 0 )
          }}</span>
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
					<span>
						{{ unit_weight( telemetry.job.cargo.mass, true, false ) | $toFixed( 1 ) }}
						<span class="ton">{{ unit_weight( telemetry.job.cargo.mass, false ) }}</span>
					</span></div>
				<div class="trailer-name">{{ telemetry.job.cargo.name }}</div>
				<!-- job information -->
				<div :class="{ 'yes': telemetry.truck.brakes.parking.enabled }" class="truck-parkBrakeOn"></div>
				<div :class="{ 'yes': telemetry.truck.brakes.airPressure.warning.enabled }" class="truck-airPressureWarningOn"></div>
				<div class="game-time wrapper-area"><span>{{ $gameTime() | $dateTimeLocalized( DATE_FORMAT_SHORT, TIME_FORMAT_SHORT ) }}</span>
				</div>
			</div>
		</div>
	</Dashboard>
</template>

<script>
import Dashboard from '../../../components/dashboards/Dashboard';
import Cadran    from '../../../components/dashboards/shared/Cadran';

export default {
  name: 'DashDefault',
  components: {
    Dashboard,
    Cadran
  },
  methods: {
    speed( truckSpeed, showValue = true, showSymbol = true ) {
      return this.$options.filters.unit_speed( truckSpeed, showValue, showSymbol );
    }
  }
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/daf-xf";
</style>
