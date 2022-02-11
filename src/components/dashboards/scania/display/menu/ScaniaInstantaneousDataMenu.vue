<template>
  <div
    class="instantaneousData d-flex justify-content-center align-items-start flex-column w-100 h-100"
  >
    <ScaniaBar
      v-bind="{
        min: 20,
        max: 36,
        value: telemetry.truck.engine.batteryVoltage.value,
        unit: 'V',
        displayMidLabel: false,
        displayValuePosition: 'right'
      }"
    >
      <i class="icon icon-scania-battery_red" />
    </ScaniaBar>
    <ScaniaBar
      v-bind="{
        min: 0,
        max: $psiToCurrentPressureUnit(175),
        value: unit_pressure(
          telemetry.truck.brakes.airPressure.value,
          true,
          false
        ),
        unit: unit_pressure(1, false, true),
        displayValuePosition: 'right'
      }"
    >
      <i class="icon icon-scania-parking-break_red" />
    </ScaniaBar>
    <ScaniaBar
      v-bind="{
        min: 0,
        max: 100,
        value:
          (telemetry.truck.adBlue.value * 100) /
          telemetry.truck.adBlue.capacity,
        unit: '%',
        displayValuePosition: 'right'
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
  name: 'ScaniaInstantaneousDataMenu',
  components: { ScaniaBar },
  mixins: [TelemetryMixin]
};
</script>
