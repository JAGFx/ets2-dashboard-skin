<template>
  <div>
    <Cadran
      v-bind="{
        classCSS: 'truck-speed',
        type: 'meter',
        value: telemetry2.truck.speed,
        min: $convertToUnit(2.77778, 'unit_speed'),
        max: $convertToUnit(36.1111, 'unit_speed'),
        minAngle: -116.3,
        maxAngle: 116.8
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-engineRpm',
        type: 'meter',
        value: telemetry2.truck.rpm,
        min: 300,
        max: 2700,
        minAngle: -117.7,
        maxAngle: 118
      }"
    />
  </div>
</template>

<script>
import Cadran from '@/components/dashboards/shared/Cadran';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaNextGenGauges',
  components: { Cadran },
  mixins: [TelemetryMixin]
};
</script>
