<template>
  <div
    v-if="telemetry2.truck.ignitionIsTurnedOn"
    class="adblue d-flex justify-content-center align-items-center w-100"
  >
    <i class="icon-scania-ad-blue-low_yellow mr-2"></i>
    <div class="adblue-bars w-100">
      <div class="labels d-flex justify-content-between align-items-center">
        <span>0</span>
        <span>1/2</span>
        <span>1</span>
      </div>
      <div
        class="bar-wrapper d-flex justify-content-between align-items-center"
      >
        <div class="bar" :style="{ width: `${size()}%` }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaNextGenAdBlueBar',
  mixins: [TelemetryMixin],
  methods: {
    size() {
      return (
        (this.telemetry2.truck.adBlueLevel * 100) /
        this.telemetry2.truck.adBlueCapacity
      );
    }
  }
};
</script>
