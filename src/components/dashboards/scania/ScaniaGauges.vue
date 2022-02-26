<template>
  <div>
    <Cadran
      v-bind="{
        classCSS: 'truck-speed',
        type: 'meter',
        value: unit_speed(telemetry.truck.speed, true, false),
        min: $speedUnitReadable({ kph: 10, mph: 10 }),
        max: $speedUnitReadable({ kph: 130, mph: 130 }),
        minAngle: -122,
        maxAngle: 123
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-engineRpm',
        type: 'meter',
        value: telemetry.truck.engine.rpm.value / 100,
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
        value: telemetry.truck.fuel.value,
        min: 0,
        max: telemetry.truck.fuel.capacity,
        minAngle: -53,
        maxAngle: 53
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-waterTemperature',
        type: 'meter',
        value: telemetry.truck.engine.waterTemperature.value,
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
        value: unit_pressure(
          telemetry.truck.engine.oilPressure.value,
          true,
          false
        ),
        min: 0,
        max: $pressureUnitReadable(116),
        minAngle: -53,
        maxAngle: 53
      }"
    />
    <Cadran
      v-bind="{
        classCSS: 'truck-fuelAverageConsumption',
        type: 'meter',
        value: unit_consumption(
          telemetry.truck.fuel.avgConsumption,
          true,
          false
        ),
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
