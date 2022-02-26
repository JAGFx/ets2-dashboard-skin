<template>
  <div>
    <Cadran
      v-bind="{
        classCSS: 'truck-speed',
        type: 'meter',
        value: telemetry2.truck.speed,
        min: 2.77778,
        max: 36.1111,
        minAngle: -122,
        maxAngle: 123
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-engineRpm',
        type: 'meter',
        value: telemetry2.truck.rpm / 100,
        min: 3,
        max: 27,
        minAngle: -122,
        maxAngle: 122
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
        min: 40,
        max: 100,
        minAngle: -55,
        maxAngle: 40
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-oilPressure',
        type: 'meter',
        value: telemetry2.truck.oilPressure,
        min: 0,
        max: 116,
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
        max: 120,
        minAngle: -56,
        maxAngle: 57
      }"
    />
  </div>
</template>

<script>
import Cadran from '@/components/dashboards/shared/Cadran';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaGauges',
  components: {
    Cadran
  },
  mixins: [TelemetryMixin]
};
</script>
