<template>
  <div
    v-if="telemetry2.truck.ignitionIsTurnedOn"
    class="fuel-gauge d-flex justify-content-between align-items-center"
  >
    <div
      v-for="i in getFuelBarCount()"
      :key="i"
      :class="{ active: getFuelBarActive(i) }"
      class="bar"
    />
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaNextGenFuelGauge',
  mixins: [TelemetryMixin],
  methods: {
    getFuelByBar: function () {
      return (
        this.telemetry2.truck.fuelCapacity * this.telemetry2.truck.fuelFactor
      ).toFixed(0);
    },
    getFuelBarCount: function () {
      return Math.ceil(
        this.telemetry2.truck.fuelCapacity / this.getFuelByBar()
      );
    },
    getFuelBarActive: function (i) {
      const fuelByBar = this.getFuelByBar();
      const iLow = i - 1;
      const fuelBarFrom = iLow * fuelByBar;

      return (
        this.telemetry2.truck.fuelLevel >= fuelBarFrom &&
        this.telemetry2.truck.ignitionIsTurnedOn
      );
    }
  }
};
</script>
