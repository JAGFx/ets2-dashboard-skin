<template>
  <div>
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
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaGeneralWarningSymbols',
  mixins: [TelemetryMixin]
};
</script>
