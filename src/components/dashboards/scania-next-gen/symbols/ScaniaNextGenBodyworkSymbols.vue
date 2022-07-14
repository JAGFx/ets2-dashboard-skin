<template>
  <div class="bodywork">
    <div class="symbols">
      <div class="symbol" />
      <div class="symbol" />
      <div class="symbol blue">
        <i
          v-if="telemetry2.symbols.beaconIsEnabled"
          class="icon-scania-rotating-beacon_blue"
        />
      </div>
      <div class="symbol" />
    </div>
    <div class="symbols ml-2">
      <div class="symbol" />
      <div class="symbol" />
      <div class="symbol" />
      <div class="symbol" />
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaNextGenBodyworkSymbols',
  mixins: [TelemetryMixin]
};
</script>
