<template>
  <div class="bars d-flex justify-content-between align-items-center">
    <div
      v-for="i in barCount()"
      :key="i"
      :class="{ active: barIsActive(i) }"
      class="bar"
    />
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'Bars',
  mixins: [TelemetryMixin],
  props: {
    level: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    factor: {
      type: Number,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: 'progress'
    }
  },
  methods: {
    valueByBar() {
      return (this.capacity / this.factor).toFixed(0);
    },
    barCount() {
      return Math.ceil(this.capacity / this.valueByBar());
    },
    barIsActive(i) {
      if (!this.telemetry2.truck.ignitionIsTurnedOn) return false;

      const valueByBar = this.valueByBar();
      const iLow = i - 1;
      const valueBarFrom = iLow * valueByBar;
      const valueBarTo = i * valueByBar;

      return this.mode === 'progress'
        ? this.level >= valueBarFrom
        : this.level >= valueBarFrom && this.level <= valueBarTo;
    }
  }
};
</script>
