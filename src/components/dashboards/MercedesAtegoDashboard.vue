<template>
  <Dashboard v-slot="dashProps" class="mercedes-atego-dash wrapper">
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
        <Cadran
          v-bind="{
            classCSS: 'truck-speed',
            type: 'meter',
            value: telemetry2.truck.speed,
            min: $convertToUnit(2.77778, 'unit_speed'),
            max: $convertToUnit(33, 33333, 'unit_speed'),
            minAngle: -111,
            maxAngle: 110
          }"
        />
        <div class="truck-speedRounded wrapper-area">
          <span>{{ telemetry2.truck.speed.toFixed(0) }}</span>
        </div>
        <Cadran
          v-bind="{
            classCSS: 'truck-engineRpm',
            type: 'meter',
            value: telemetry.truck.engine.rpm.value / 100,
            min: 0,
            max: 30,
            minAngle: -111,
            maxAngle: 112
          }"
        />
        <Cadran
          v-bind="{
            classCSS: 'truck-fuel',
            type: 'meter',
            value: telemetry.truck.fuel.value,
            min: 0,
            max: telemetry.truck.fuel.capacity,
            minAngle: -103,
            maxAngle: 103
          }"
        />
        <Cadran
          v-bind="{
            classCSS: 'truck-airPressure',
            type: 'meter',
            value: $pressureToBar(telemetry.truck.brakes.airPressure.value),
            min: 0,
            max: 12,
            minAngle: -103,
            maxAngle: 105
          }"
        />
        <div class="truck-odometer wrapper-area">
          <span>{{
            unit_length(telemetry.truck.odometer, 'km', true, false).toFixed(0)
          }}</span>
        </div>
        <div class="truck-gear wrapper-area">
          <span>{{ telemetry2.truck.gearDisplayed }}</span>
        </div>
        <!-- indicators -->
        <div
          :class="{ yes: telemetry.truck.lights.blinker.left.active }"
          class="truck-blinkerLeftOn"
        />
        <div
          :class="{ yes: telemetry.truck.lights.blinker.right.active }"
          class="truck-blinkerRightOn"
        />
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
          :class="{ yes: telemetry.trailer.attached }"
          class="trailer-attached"
        />
        <div
          :class="{ yes: telemetry.truck.fuel.warning.enabled }"
          class="truck-fuelWarningOn"
        />
        <div
          :class="{ yes: telemetry.truck.brakes.airPressure.warning.enabled }"
          class="truck-airPressureWarningOn"
        />
        <div
          :class="{ yes: telemetry.truck.brakes.parking.enabled }"
          class="truck-parkBrakeOn"
        />
        <div class="truck-retarderBrake wrapper-area">
          <span>{{
            $t(telemetry.truck.brakes.retarder.level > 0 ? 'On' : 'Off')
          }}</span>
        </div>
        <div class="game-time wrapper-area">
          <span>{{
            $dateTimeLocalized(
              telemetry2.gameTime,
              DATE_FORMAT_SHORT,
              TIME_FORMAT_SHORT
            )
          }}</span>
        </div>
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard';
import Cadran from '@/components/dashboards/shared/Cadran';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'MercedesAtegoDashboard',
  components: {
    Dashboard,
    Cadran
  },
  mixins: [TelemetryMixin]
};
</script>
