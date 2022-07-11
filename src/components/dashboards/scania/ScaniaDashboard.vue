<template>
  <Dashboard v-slot="dashProps" class="scania-dash wrapper">
    <div
      class="dashboard game-connected"
      :style="{
        transform: `scale(${dashProps.currentScale}) translate(-50%, -50%)`,
        width: dashProps.skinData.size.width + 'px',
        height: dashProps.skinData.size.height + 'px'
      }"
    >
      <!--GAUGES -->
      <ScaniaGauges />
      <!-- indicators -->
      <div class="symbols">
        <ScaniaGeneralWarningSymbols />
        <ScaniaBodybuilderSymbols />
        <ScaniaIndicatorSymbols />
      </div>

      <ScaniaDisplay v-if="telemetry2.truck.ignitionIsTurnedOn" />
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard.vue';
import ScaniaDisplay from '@/components/dashboards/scania/display/ScaniaDisplay.vue';
import ScaniaGauges from '@/components/dashboards/scania/ScaniaGauges.vue';
import ScaniaBodybuilderSymbols from '@/components/dashboards/scania/symbols/ScaniaBodybuilderSymbols.vue';
import ScaniaGeneralWarningSymbols from '@/components/dashboards/scania/symbols/ScaniaGeneralWarningSymbols.vue';
import ScaniaIndicatorSymbols from '@/components/dashboards/scania/symbols/ScaniaIndicatorSymbols.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaDashboard',
  components: {
    Dashboard,
    ScaniaDisplay,
    ScaniaGauges,
    ScaniaBodybuilderSymbols,
    ScaniaGeneralWarningSymbols,
    ScaniaIndicatorSymbols
  },
  mixins: [TelemetryMixin]
};
</script>
