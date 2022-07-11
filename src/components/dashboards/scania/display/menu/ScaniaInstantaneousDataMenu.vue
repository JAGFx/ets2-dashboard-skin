<template>
  <div
    class="instantaneousData d-flex justify-content-center align-items-start flex-column w-100 h-100"
  >
    <ScaniaBar
      v-bind="{
        min: 20,
        max: 36,
        value: telemetry2.truck.batteryVoltage,
        unit: 'V',
        displayMidLabel: false
      }"
    >
      <i class="icon icon-scania-battery_red" />
    </ScaniaBar>
    <ScaniaBar
      v-bind="{
        min: 0,
        max: 175,
        value: telemetry2.truck.brakeAirPressure,
        unit: $unitReadable('unit_pressure')
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
        unit: '%'
      }"
    >
      <i class="icon icon-scania-ad-blue-low_yellow" />
    </ScaniaBar>
  </div>
</template>

<script>
import ScaniaBar from '@/components/dashboards/scania/ScaniaBar.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaInstantaneousDataMenu',
  components: { ScaniaBar },
  mixins: [TelemetryMixin]
};
</script>
