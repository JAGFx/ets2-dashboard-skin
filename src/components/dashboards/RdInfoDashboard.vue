<template>
  <Dashboard v-slot="dashProps" class="rd-info-dash wrapper">
    <div
      class="dashboard game-connected yes"
      :style="{
        transform:
          'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
        width: dashProps.skinData.size.width + 'px',
        height: dashProps.skinData.size.height + 'px'
      }"
    >
      <div :class="{ yes: telemetry.job.cargo.id }" class="hasJob">
        <!-- meters -->
        <!--
          Attributes:
          data-min-angle: angle in degress for the arrow for data-min value (0 = vertical, negative = left, positive = right)
          data-max-angle: an gle in degress for the arrow for data-max value (0 = vertical, negative = left, positive = right)
          data-min: minimal possible value (as in JSON response), you may also use any telemetry property name for dynamic values
          data-max: maximum possible value (as in JSON response), you may also use any telemetry property name for dynamic values
          -->
        <!--<Cadran v-bind="{
          'classCSS': 'truck-speed',
          'type': 'meter',
          'value': telemetry.truck.speed.kph,
          'min': 0,
          'max': 120,
          'minAngle' : -111,
          'maxAngle': 110,
        }"></Cadran>-->
        <!--				<div class="truck-speedRounded wrapper-area"><span>{{ telemetry.truck.speed unit_speed( telemetry.truck.speed, true, false ) | $toFixed( 0 )  }}</span></div>-->
        <!--<Cadran v-bind="{
          'classCSS': 'truck-engineRpm',
          'type': 'meter',
          'value': telemetry.truck.engine.rpm.value / 100,
          'min': 0,
          'max': 30,
          'minAngle' : -111,
          'maxAngle': 112,
        }"></Cadran>
        <Cadran v-bind="{
          'classCSS': 'truck-fuel',
          'type': 'meter',
          'value': telemetry.truck.fuel.value,
          'min': 0,
          'max': telemetry.truck.fuel.capacity,
          'minAngle' : -103,
          'maxAngle': 103,
        }"></Cadran>-->
        <!--<Cadran v-bind="{
          'classCSS': 'truck-waterTemperature',
          'type': 'meter',
          'value': telemetry.truck.engine.waterTemperature.value,
          'min': -48,
          'max': 100,
          'minAngle' : -48,
          'maxAngle': 13,
        }"></Cadran>-->
        <!--<Cadran v-bind="{
          'classCSS': 'truck-airPressure',
          'type': 'meter',
          'value': telemetry.truck.engine.waterTemperature.value,
          'min': 0,
          'max': 200,
          'minAngle' : -103,
          'maxAngle': 111,
        }"></Cadran>-->

        <div class="truck-wearEngine wrapper-area">
          <span>{{ (telemetry.truck.damage.engine * 100).toFixed(0) }}%</span>
        </div>
        <div class="truck-wearTransmission wrapper-area">
          <span
            >{{ (telemetry.truck.damage.transmission * 100).toFixed(0) }}%</span
          >
        </div>
        <div class="truck-wearCabin wrapper-area">
          <span>{{ (telemetry.truck.damage.cabin * 100).toFixed(0) }}%</span>
        </div>
        <div class="truck-wearWheels wrapper-area">
          <span>{{ (telemetry.truck.damage.wheels * 100).toFixed(0) }}%</span>
        </div>
        <div class="truck-wearChassis wrapper-area">
          <span>{{ (telemetry.truck.damage.chassis * 100).toFixed(0) }}%</span>
        </div>
        <div class="trailer-wear wrapper-area">
          <span>{{ (telemetry.trailer.cargo.damage * 100).toFixed(0) }} %</span>
        </div>
        <div class="truck-make wrapper-area">
          <span>{{ telemetry.truck.brand.name }}</span>
        </div>
        <div
          :class="{ yes: telemetry.truck.lights.beamHigh.enabled }"
          class="truck-lightsBeamHighOn"
        />
        <div
          :class="{ yes: telemetry.truck.lights.beamLow.enabled }"
          class="truck-lightsBeamLowOn"
        />
        <div
          :class="{ yes: telemetry.truck.lights.parking.enabled }"
          class="truck-lightsParkingOn"
        />
        <div
          :class="{ yes: telemetry.truck.cruiseControl.enabled }"
          class="truck-cruiseControlOn"
        />
        <div
          :class="{ yes: telemetry.truck.brakes.parking.enabled }"
          class="truck-parkBrakeOn"
        />
        <div
          :class="{ yes: telemetry.truck.brakes.airPressure.warning.enabled }"
          class="_airPressureOn"
        />
        <div class="truck-fuel">
          {{ unit_volume(telemetry.truck.fuel.value) }}
        </div>
        <div class="truck-fuelAverageConsumption">
          {{
            unit_consumption(telemetry.truck.fuel.avgConsumption, true, false)
              | $toFixed(1)
          }}
        </div>
        <div class="_fuelAvg">
          {{ unit_consumption(telemetry.truck.fuel.avgConsumption, false) }}
        </div>
        <div
          :style="{ width: telemetry.controls.game.brake * 606 + 'px' }"
          class="_gameBrakeBar"
        />
        <div
          :style="{ width: telemetry.controls.input.brake * 606 + 'px' }"
          class="_userBrakeBar"
        />
        <div
          :style="{ width: telemetry.controls.game.throttle * 606 + 'px' }"
          class="_gameThrottleBar"
        />
        <div
          :style="{ width: telemetry.controls.input.throttle * 606 + 'px' }"
          class="_userThrottleBar"
        />
        <!--				<div :class="{ 'yes': telemetry.truck.lights.beacon.enabled }" class="truck-lightsBeaconOn"></div>-->
        <div
          :class="{
            yes:
              telemetry.truck.lights.blinker.left.active ||
              telemetry.truck.lights.blinker.right.active
          }"
          class="_dangerWarning"
        />
        <div
          :class="{ yes: telemetry.truck.lights.parking.enabled }"
          class="_auxLights"
        />
        <div
          :class="{
            yes:
              telemetry.truck.lights.auxFront.value !== 0 ||
              telemetry.truck.lights.auxRoof.value !== 0
          }"
          class="truck-lightsParkingOn"
        />
        <div class="navigation-speedLimit">
          {{
            unit_speed(telemetry.navigation.speedLimit, true, false)
              | $toFixed(0)
          }}
        </div>

        <!--				<div class="truck-odometer wrapper-area"><span>{{ unit_length( telemetry.truck.odometer, 'km', true, false ) | $toFixed( 0 ) }}</span></div>-->
        <!--				<div class="truck-cruiseControlSpeedRounded wrapper-area"><span>{{ telemetry.truck.cruiseControl.kph }}</span></div>-->
        <div class="truck-displayedGear wrapper-area">
          <span>{{
            $trukGear(telemetry.truck.transmission, telemetry.truck.brand)
          }}</span>
        </div>
        <!-- indicators -->
        <!--				<div :class="{ 'yes': telemetry.truck.lights.blinker.left.active}" class="truck-blinkerLeftOn"></div>-->
        <!--				<div :class="{ 'yes': telemetry.truck.lights.blinker.right.active }" class="truck-blinkerRightOn"></div>-->

        <div class="job-remainingTime wrapper-area">
          <span v-if="$jobRemainingTimeToDueDate()">{{
            telemetry.job.expectedDeliveryTimestamp.value
              | $dateTimeLocalized(DATE_FORMAT_LONG, TIME_FORMAT_SHORT)
          }}</span>
          <span v-else>{{
            $jobRemainingTimeDelivery(telemetry.job.deliveryTime.unix)
          }}</span>
        </div>
        <div class="job-sourceCity wrapper-area">
          <span>{{ telemetry.job.source.city.name }}</span>
        </div>
        <div class="job-destinationCity wrapper-area">
          <span>{{ telemetry.job.destination.city.name }}</span>
        </div>
        <div class="_jobIncome wrapper-area">
          <span
            ><span class="job-income">{{
              unit_currency(telemetry.job.income)
            }}</span></span
          >
        </div>
        <div class="trailer-name wrapper-area">
          <span>{{ telemetry.trailer.model.name }}</span>
        </div>

        <!--				<div :class="{'yes': telemetry.trailer.attached}" class="trailer-attached"></div>-->
        <!--				<div class="trailer-mass wrapper-area">-->
        <!--					<span>{{ unit_weight( telemetry.job.cargo.mass, true, false ) | $toFixed( 1 ) }}<span class="ton">{{ unit_weight( telemetry.job.cargo.mass, false ) }}</span></span></div>-->
        <!--				<div class="trailer-name">{{ telemetry.job.cargo.name }}</div>-->
        <!--				<div :class="{ 'yes': telemetry.truck.fuel.warning.enabled }" class="truck-fuelWarningOn"></div>-->
        <!--				<div :class="{ 'yes': telemetry.truck.brakes.airPressure.warning.enabled }" class="truck-airPressureWarningOn"></div>-->

        <!--				<div class="truck-retarderBrake">{{ telemetry.truck.brakes.retarder.level > 0 ? 'On' : 'Off' }}</div>-->
        <!--				<div class="truck-oilTemperature">{{ telemetry.truck.engine.oilTemperature.value.toFixed(0) }}</div>-->
        <!--				<div class="truck-batteryVoltage">{{ telemetry.truck.engine.batteryVoltage.warning.factor.toFixed(0) }}</div>-->
        <!--				<div class="game-time wrapper-area"><span>{{ $formatDate( $telemetryData().game.time.unix ) }}</span></div>-->
        <!--				<div :class="{ 'yes': telemetry.truck.brakes.airPressure.emergency.enabled }" class="truck-airPressureEmergencyOn"></div>-->
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'RdInfoDashboard',
  components: {
    Dashboard
  },
  mixins: [TelemetryMixin]
};
</script>
