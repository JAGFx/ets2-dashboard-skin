<template>
  <div class="menu h-100">
    <ScaniaBar
      v-bind="{
        min: 20,
        max: 36,
        value: telemetry2.truck.batteryVoltage,
        unit: 'V',
        displayMidLabel: false,
        displayValue: false
      }"
    >
      <i class="icon icon-scania-battery_red" />
    </ScaniaBar>
    <ScaniaBar
      v-bind="{
        min: 0,
        max: 175,
        value: telemetry2.truck.brakeAirPressure,
        unit: $unitReadable('unit_pressure'),
        displayValue: false
      }"
    >
      <i class="icon icon-scania-parking-break_red" />
    </ScaniaBar>
    <ScaniaBar
      v-bind="{
        min: 0,
        max: 100,
        value:
          (telemetry2.truck.adBlueLevel * 100) /
          telemetry2.truck.adBlueCapacity,
        unit: '%',
        displayValue: false
      }"
    >
      <i class="icon icon-scania-ad-blue-low_yellow" />
    </ScaniaBar>
  </div>
</template>

<script>
import ScaniaBar from '@/components/dashboards/scania/ScaniaBar';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaNextGenInstantaneousDataMenu',
  components: { ScaniaBar },
  mixins: [TelemetryMixin]
};
</script>
