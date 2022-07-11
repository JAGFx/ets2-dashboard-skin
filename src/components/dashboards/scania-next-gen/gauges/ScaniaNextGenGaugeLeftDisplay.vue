<template>
  <div
    v-if="telemetry2.truck.ignitionIsTurnedOn"
    class="gauge-display d-flex justify-content-center align-items-center flex-column"
  >
    <slot />
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaNextGenGaugeDisplay',
  mixins: [TelemetryMixin]
};
</script>
