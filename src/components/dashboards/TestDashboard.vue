<template>
  <Dashboard class="test wrapper">
    <div class="speed">
      <span class="value">{{ telemetry2.truck.speed.toFixed(0) }}</span>
      <small class="unit">{{ $unitReadable('unit_speed') }}</small>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'TestDashboard',
  components: {
    Dashboard
  },
  mixins: [TelemetryMixin]
};
</script>
