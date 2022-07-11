<template>
  <div>
    <Cadran
      v-bind="{
        classCSS: 'truck-speed',
        type: 'meter',
        value: telemetry2.truck.speed,
        min: $convertToUnit(2.77778, 'unit_speed'),
        max: $convertToUnit(36.1111, 'unit_speed'),
        minAngle: -114.3,
        maxAngle: 114.8
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-engineRpm',
        type: 'meter',
        value: telemetry2.truck.rpm,
        min: 300,
        max: 2700,
        minAngle: -115,
        maxAngle: 113.6
      }"
    />
  </div>
</template>

<script>
import Cadran from '@/components/dashboards/shared/Cadran.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaNextGenGauges',
  components: { Cadran },
  mixins: [TelemetryMixin]
};
</script>
