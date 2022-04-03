<template>
  <div>
    <!-- Line 1 -->
    <div
      v-if="telemetry2.truck.hasErrors"
      class="truck-stopWarning flex-area symbol r1 c1 red"
    >
      <i class="icon-scania-warning_red" />
    </div>
    <div
      v-if="telemetry2.truck.hasWarnings"
      class="truck-checkWarning flex-area symbol r1 c2 yellow"
    >
      <i class="icon-scania-warning_yellow" />
    </div>

    <!-- Line 2 -->
    <div
      v-if="telemetry2.symbols.brakePressureIsActive"
      class="truck-brake-pressure flex-area symbol r2 c1 red"
    >
      <i class="icon-scania-break-pressure_red_yellow" />
    </div>
    <div
      v-if="telemetry2.symbols.parkingBrakeIsEnabled"
      class="truck-parkBrake flex-area symbol r2 c2 red"
    >
      <i class="icon-scania-parking-break_red" />
    </div>
    <div
      v-if="telemetry2.symbols.retarderIsActive"
      class="retarder flex-area symbol r2 c4 green"
    >
      <i class="icon-scania-retarder_green" />
    </div>

    <!-- Line 3 -->
    <div
      v-if="telemetry2.truck.hasEngineWarning"
      class="engine-failure flex-area symbol r3 c2 yellow"
    >
      <i class="icon-scania-engine-failure_yellow" />
    </div>
    <div
      v-if="telemetry2.symbols.differentialIsLocked"
      class="truck-differentialLock flex-area symbol r3 c4 yellow"
    >
      <i class="icon-scania-differential-lock_yellow" />
    </div>

    <!-- Line 4 -->
    <div
      v-if="telemetry2.truck.ignitionStart"
      class="driver-safty-belt flex-area symbol r4 c2 red"
    >
      <i class="icon-scania-driver-safty-belt_red" />
    </div>
    <div
      v-if="telemetry2.symbols.truckLiftAxleIsEnabled"
      class="tractor-tag-axle-raised flex-area symbol r4 c3 yellow"
    >
      <i class="icon-scania-tractor-tag-axle-raised_yellow" />
    </div>
    <div
      v-if="telemetry2.symbols.trailerLiftAxleIsEnabled"
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
