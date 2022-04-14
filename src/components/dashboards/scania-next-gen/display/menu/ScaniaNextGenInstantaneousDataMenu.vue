<template>
  <div class="menu h-100">
    <ScaniaNextGenBar
      v-bind="{
        min: 20,
        max: 36,
        value: telemetry2.truck.batteryVoltage,
        unit: 'V',
        displayMidLabel: false
      }"
    >
      <i class="icon icon-scania-battery_red" />
    </ScaniaNextGenBar>
    <ScaniaNextGenBar
      class="py-1"
      v-bind="{
        min: 0,
        max: 175,
        value: telemetry2.truck.brakeAirPressure,
        unit: $unitReadable('unit_pressure')
      }"
    >
      <i class="icon icon-scania-parking-break_red" />
    </ScaniaNextGenBar>
    <ScaniaNextGenBar
      v-bind="{
        min: 0,
        max: 100,
        value:
          (telemetry2.truck.adBlueLevel * 100) /
          telemetry2.truck.adBlueCapacity,
        unit: '%'
      }"
    >
      <i class="icon icon-scania-ad-blue-low_yellow" />
    </ScaniaNextGenBar>
  </div>
</template>

<script>
import ScaniaNextGenBar from '@/components/dashboards/scania-next-gen/display/ScaniaNextGenBar';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaNextGenInstantaneousDataMenu',
  components: { ScaniaNextGenBar },
  mixins: [TelemetryMixin]
};
</script>
