<template>
  <div class="bodywork">
    <div class="symbols">
      <div class="symbol"></div>
      <div class="symbol"></div>
      <div class="symbol blue">
        <i
          v-if="telemetry2.symbols.beaconIsEnabled"
          class="icon-scania-rotating-beacon_blue"
        />
      </div>
      <div class="symbol"></div>
    </div>
    <div class="symbols ml-2">
      <div class="symbol"></div>
      <div class="symbol"></div>
      <div class="symbol"></div>
      <div class="symbol"></div>
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaNextGenBodyworkSymbols',
  mixins: [TelemetryMixin]
};
</script>
