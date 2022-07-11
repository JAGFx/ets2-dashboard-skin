<template>
  <div>
    <div
      v-if="telemetry2.symbols.beaconIsEnabled"
      class="rotating-light flex-area symbol"
    >
      <i class="icon-scania-rotating-beacon_blue" />
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaBodybuilderSymbols',
  mixins: [TelemetryMixin]
};
</script>
