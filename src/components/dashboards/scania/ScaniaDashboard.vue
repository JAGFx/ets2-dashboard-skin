<template>
  <Dashboard v-slot="dashProps" class="scania-dash wrapper">
    <div
      class="dashboard game-connected"
      :class="{ yes: telemetry.truck.electric.enabled }"
      :style="{
        transform:
          'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
        width: dashProps.skinData.size.width + 'px',
        height: dashProps.skinData.size.height + 'px'
      }"
    >
      <div
        class="dashLights"
        :class="{ yes: telemetry.truck.electric.enabled }"
      ></div>
      <div
        class="dash"
        :class="{ yes: telemetry.truck.electric.enabled }"
      ></div>
      <!-- Liftable Axles -->
      <div class="tractor-tag-axle-raised flex-area symbol">
        <i class="icon-scania-tractor-tag-axle-raised_yellow" />
      </div>
      <div class="trailer-tag-axle-raised flex-area symbol">
        <i class="icon-scania-trailer-tag-axle-raised_yellow" />
      </div>
      <div
        v-if="telemetry.truck.lights.beacon.enabled"
        class="rotating-light flex-area symbol"
      >
        <i class="icon-scania-rotating-beacon_blue" />
      </div>
      <div class="driver-safty-belt flex-area symbol">
        <i class="icon-scania-driver-safty-belt_red" />
      </div>

      <!--GAUGES -->
      <Cadran
        v-bind="{
          classCSS: 'truck-speed',
          type: 'meter',
          value: telemetry.truck.speed.kph,
          min: 10,
          max: 130,
          minAngle: -122,
          maxAngle: 123
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-engineRpm',
          type: 'meter',
          value: telemetry.truck.engine.rpm.value / 100,
          min: 3,
          max: 27,
          minAngle: -122,
          maxAngle: 122
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-fuel',
          type: 'meter',
          value: telemetry.truck.fuel.value,
          min: 0,
          max: telemetry.truck.fuel.capacity,
          minAngle: -53,
          maxAngle: 53
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-waterTemperature',
          type: 'meter',
          value: telemetry.truck.engine.waterTemperature.value,
          min: 40,
          max: 100,
          minAngle: -55,
          maxAngle: 40
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-oilPressure',
          type: 'meter',
          value: $pressureToBar(telemetry.truck.engine.oilPressure.value),
          min: 0,
          max: 8,
          minAngle: -53,
          maxAngle: 53
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-fuelAverageConsumption',
          type: 'meter',
          value: unit_consumption(
            telemetry.truck.fuel.avgConsumption,
            true,
            false
          ),
          min: 0,
          max: 120,
          minAngle: -56,
          maxAngle: 57
        }"
      />

      <!-- indicators -->
      <div class="truck-odometer flex-area justify-content-start">
        <span class="pl-3">{{
          unit_length(telemetry.truck.odometer, 'km')
        }}</span>
      </div>
      <div class="startIcons"></div>

      <!-- infodash -->
      <div
        class="truck-electricOn"
        :class="{ yes: telemetry.truck.electric.enabled }"
      >
        <div
          v-if="telemetry.truck.differential.lock.enabled"
          class="truck-differentialLock flex-area symbol"
        >
          <i class="icon-scania-differential-lock_yellow" />
        </div>
        <div
          class="startIcons"
          :class="{ yes: telemetry.truck.electric.enabled }"
        ></div>
        <div
          v-if="telemetry.truck.engine.enabled"
          class="engine-failure flex-area symbol"
        >
          <i class="icon-scania-engine-failure_yellow" />
        </div>
        <div
          v-if="telemetry.truck.lights.blinker.left.active"
          class="truck-blinkerLeft flex-area"
        >
          <i class="icon-scania-direction-indicator-left_green" />
        </div>
        <div
          v-if="telemetry.truck.lights.blinker.right.active"
          class="truck-blinkerRight flex-area"
        >
          <i class="icon-scania-direction-indicator-right_green" />
        </div>
        <div
          v-if="telemetry.truck.lights.beamHigh.enabled"
          class="truck-lightsBeamHigh flex-area symbol"
        >
          <i class="icon-scania-main-beam_blue" />
        </div>
        <!--        <div class="_airPressureBar1"></div>-->
        <!--        <div class="truck-airGauge1"></div>-->
        <!--        <div class="truck-airPressureWarningOn1"></div>-->
        <!--        <div class="_airPressureBar2"></div>-->
        <!--        <div class="truck-airGauge2"></div>-->
        <!--        <div class="truck-airPressureWarningOn2"></div>-->
        <div class="truck-brake-pressure flex-area symbol">
          <i class="icon-scania-break-pressure_red_yellow" />
        </div>
        <div
          v-if="telemetry.truck.lights.parking.enabled"
          class="truck-parkBrake flex-area symbol"
        >
          <i class="icon-scania-parking-break_red" />
        </div>
        <div
          class="truck-airPressureEmergencyOn"
          :class="{ yes: telemetry.truck.brakes.airPressure.emergency.enabled }"
        ></div>
        <div
          v-if="telemetry.truck.brakes.retarder.level > 0"
          class="retarder flex-area symbol"
        >
          <i class="icon-scania-retarder_green" />
        </div>
        <div class="temperature flex-area justify-content-end">
          <span class="pr-3">--°C</span>
        </div>
        <div class="truck-stopWarning flex-area symbol">
          <i class="icon-scania-warning_red" />
        </div>
        <div class="truck-checkWarning flex-area symbol">
          <i class="icon-scania-warning_yellow" />
        </div>
      </div>
      <ScaniaDisplay />
    </div>
  </Dashboard>
</template>

<script>
import ScaniaDisplay from '@/components/dashboards/scania/display/ScaniaDisplay';
import TelemetryMixin from '@/mixins/TelemetryMixin';
import Dashboard from '@/components/dashboards/Dashboard';
import Cadran from '@/components/dashboards/shared/Cadran';

export default {
  name: 'ScaniaDashboard',
  components: {
    Dashboard,
    ScaniaDisplay,
    Cadran
  },
  mixins: [TelemetryMixin]
};
</script>
