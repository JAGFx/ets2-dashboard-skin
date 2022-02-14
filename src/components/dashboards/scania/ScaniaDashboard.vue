<template>
  <Dashboard v-slot="dashProps" class="scania-dash wrapper">
    <div
      class="dashboard game-connected"
      :class="{ yes: truckElectricOn }"
      :style="{
        transform:
          'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
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

      <ScaniaDisplay />
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard';
import ScaniaDisplay from '@/components/dashboards/scania/display/ScaniaDisplay';
import ScaniaGauges from '@/components/dashboards/scania/ScaniaGauges';
import ScaniaBodybuilderSymbols from '@/components/dashboards/scania/symbols/ScaniaBodybuilderSymbols';
import ScaniaGeneralWarningSymbols from '@/components/dashboards/scania/symbols/ScaniaGeneralWarningSymbols';
import ScaniaIndicatorSymbols from '@/components/dashboards/scania/symbols/ScaniaIndicatorSymbols';
import TelemetryMixin from '@/mixins/TelemetryMixin';

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
