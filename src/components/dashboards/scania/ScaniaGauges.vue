<template>
  <div>
    <Cadran
      v-bind="{
        classCSS: 'truck-speed',
        type: 'meter',
        value: telemetry2.truck.speed,
        min: $convertToUnit(2.77778, 'unit_speed'),
        max: $convertToUnit(36.1111, 'unit_speed'),
        minAngle: -118,
        maxAngle: 118
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-engineRpm',
        type: 'meter',
        value: telemetry2.truck.rpm,
        min: 300,
        max: 2700,
        minAngle: -118,
        maxAngle: 118
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-fuel',
        type: 'meter',
        value: telemetry2.truck.fuelLevel,
        min: 0,
        max: telemetry2.truck.fuelCapacity,
        minAngle: -53,
        maxAngle: 53
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-waterTemperature',
        type: 'meter',
        value: telemetry2.truck.engineWaterTemperature,
        min: $convertToUnit(40, 'unit_degrees'),
        max: $convertToUnit(100, 'unit_degrees'),
        minAngle: -55,
        maxAngle: 55
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-oilPressure',
        type: 'meter',
        value: telemetry2.truck.oilPressure,
        min: 0,
        max: $convertToUnit(116, 'unit_pressure'),
        minAngle: -53,
        maxAngle: 53
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-fuelAverageConsumption',
        type: 'meter',
        value: telemetry2.truck.fuelAverageConsumption,
        min: 0,
        max: $convertToUnit(120, 'unit_consumption'),
        minAngle: -56,
        maxAngle: 57
      }"
    />
  </div>
</template>

<script>
import Cadran from '@/components/dashboards/shared/Cadran.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaGauges',
  components: {
    Cadran
  },
  mixins: [TelemetryMixin]
};
</script>
