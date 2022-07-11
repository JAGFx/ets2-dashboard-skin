<template>
  <div class="indicator-symbols symbols">
    <div class="symbol c2 yellow">
      <i
        v-if="telemetry2.symbols.trailerLiftAxleIsEnabled"
        class="icon-scania-trailer-tag-axle-raised_yellow"
      />
    </div>
    <div class="symbol c3 yellow">
      <i
        v-if="telemetry2.symbols.truckLiftAxleIsEnabled"
        class="icon-scania-tractor-tag-axle-raised_yellow"
      />
    </div>
    <div class="symbol c12 yellow">
      <i
        v-if="telemetry2.symbols.differentialIsLocked"
        class="icon-scania-differential-lock_yellow"
      />
    </div>
    <div class="symbol c13 green">
      <i
        v-if="telemetry2.symbols.retarderIsActive"
        class="icon-scania-retarder_green"
      />
    </div>
    <div class="symbol c14 yellow">
      <i
        v-if="telemetry2.truck.hasEngineWarning"
        class="icon-scania-engine-failure_yellow"
      />
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaNextGenIndicatorSymbols',
  mixins: [TelemetryMixin]
};
</script>
