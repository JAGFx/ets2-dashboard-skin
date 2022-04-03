<template>
  <div>
    <div
      v-if="telemetry2.symbols.leftDirectionIsActive"
      class="truck-blinkerLeft flex-area"
    >
      <i class="icon-scania-direction-indicator-left_green" />
    </div>
    <div
      v-if="telemetry2.symbols.rightDirectionIsActive"
      class="truck-blinkerRight flex-area"
    >
      <i class="icon-scania-direction-indicator-right_green" />
    </div>
    <div
      v-if="telemetry2.symbols.mainBeamIsEnabled"
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
