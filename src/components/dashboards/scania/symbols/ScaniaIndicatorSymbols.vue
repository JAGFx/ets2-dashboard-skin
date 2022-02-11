<template>
  <div>
    <!-- Line 1 -->
    <div class="truck-stopWarning flex-area symbol r1 c1 red">
      <i class="icon-scania-warning_red" />
    </div>
    <div class="truck-checkWarning flex-area symbol r1 c2 yellow">
      <i class="icon-scania-warning_yellow" />
    </div>

    <!-- Line 2 -->
    <div
      v-if="
        telemetry.truck.brakes.airPressure.warning.enabled ||
        telemetry.truck.brakes.airPressure.emergency.enabled
      "
      class="truck-brake-pressure flex-area symbol r2 c1 red"
    >
      <i class="icon-scania-break-pressure_red_yellow" />
    </div>
    <div
      v-if="telemetry.truck.lights.parking.enabled"
      class="truck-parkBrake flex-area symbol r2 c2 red"
    >
      <i class="icon-scania-parking-break_red" />
    </div>
    <div
      v-if="telemetry.truck.brakes.retarder.level > 0"
      class="retarder flex-area symbol r2 c4 green"
    >
      <i class="icon-scania-retarder_green" />
    </div>

    <!-- Line 3 -->
    <div
      v-if="telemetry.truck.engine.enabled"
      class="engine-failure flex-area symbol r3 c2 yellow"
    >
      <i class="icon-scania-engine-failure_yellow" />
    </div>
    <div
      v-if="telemetry.truck.differential.lock.enabled"
      class="truck-differentialLock flex-area symbol r3 c4 yellow"
    >
      <i class="icon-scania-differential-lock_yellow" />
    </div>

    <!-- Line 4 -->
    <div class="driver-safty-belt flex-area symbol r4 c2 red">
      <i class="icon-scania-driver-safty-belt_red" />
    </div>
    <div
      v-if="telemetry.truck.liftAxle.enabled"
      class="tractor-tag-axle-raised flex-area symbol r4 c3 yellow"
    >
      <i class="icon-scania-tractor-tag-axle-raised_yellow" />
    </div>
    <div
      v-if="telemetry.trailer.liftAxle.enabled"
      class="trailer-tag-axle-raised flex-area symbol r4 c4 yellow"
    >
      <i class="icon-scania-trailer-tag-axle-raised_yellow" />
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaIndicatorSymbols',
  mixins: [TelemetryMixin]
};
</script>
