<template>
  <div>
    <div
      v-if="telemetry.truck.lights.beacon.enabled"
      class="rotating-light flex-area symbol"
    >
      <i class="icon-scania-rotating-beacon_blue" />
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaBodybuilderSymbols',
  mixins: [TelemetryMixin]
};
</script>
