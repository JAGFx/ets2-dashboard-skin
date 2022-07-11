<template>
  <Dashboard v-slot="dashProps" class="scania-next-gen wrapper">
    <div
      class="dashboard"
      :style="{
        transform:
          'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
        width: dashProps.skinData.size.width + 'px',
        height: dashProps.skinData.size.height + 'px'
      }"
    >
      <ScaniaNextGenGauges />
      <ScaniaNextGenDisplay />
      <ScaniaNextGenGaugeDisplay class="left">
        <div
          class="speed d-flex w-100 justify-content-end align-items-end mb-1"
        >
          <span class="value">{{ telemetry2.truck.speed.toFixed(0) }}</span>
          <span class="unit">{{ $unitReadable('unit_speed') }}</span>
        </div>
        <div class="line d-flex w-100 justify-content-end align-items-end">
          <span class="value">{{ telemetry2.truck.odometer.toFixed(0) }}</span>
          <span class="unit">{{ $unitReadable('unit_length', 'km') }}</span>
        </div>
        <div class="line d-flex w-100 justify-content-between align-items-end">
          <span class="trip-label">Trip</span>
          <div class="d-flex justify-content-end align-items-end">
            <span class="value">-</span>
            <span class="unit">{{ $unitReadable('unit_length', 'km') }}</span>
          </div>
        </div>
      </ScaniaNextGenGaugeDisplay>
      <ScaniaNextGenGaugeDisplay class="right">
        <div class="hour d-flex w-100 justify-content-center align-items-end">
          <span class="value">{{
            $dateTimeLocalized(
              telemetry2.gameTime,
              DATE_FORMAT_NONE,
              TIME_FORMAT_TINY
            )
          }}</span>
        </div>
        <div
          class="exterior-temperature d-flex w-100 justify-content-end align-items-end"
        >
          <span class="value">-</span>
          <span class="unit">{{ $unitReadable('unit_degrees') }}</span>
        </div>
        <ScaniaNextGenAdBlueBar class="mt-2" />
      </ScaniaNextGenGaugeDisplay>
      <Bars
        class="fuel-gauge"
        :level="telemetry2.truck.fuelLevel"
        :capacity="telemetry2.truck.fuelCapacity"
        :factor="8"
      />
      <Bars
        class="water-temperature-gauge"
        :level="telemetry2.truck.engineWaterTemperature"
        :capacity="120"
        :factor="8"
        mode="bar"
      />

      <!-- <editor-folder> Symbols -->
      <ScaniaNextGenGeneralWarningSymbols />
      <ScaniaNextGenBodyworkSymbols />
      <ScaniaNextGenIndicatorSymbols />
      <!-- </editor-folder> Symbols -->
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard.vue';
import ScaniaNextGenDisplay from '@/components/dashboards/scania-next-gen/display/ScaniaNextGenDisplay.vue';
import ScaniaNextGenGaugeDisplay from '@/components/dashboards/scania-next-gen/gauges/ScaniaNextGenGaugeLeftDisplay.vue';
import ScaniaNextGenGauges from '@/components/dashboards/scania-next-gen/gauges/ScaniaNextGenGauges.vue';
import ScaniaNextGenAdBlueBar from '@/components/dashboards/scania-next-gen/ScaniaNextGenAdBlueBar.vue';
import ScaniaNextGenBodyworkSymbols from '@/components/dashboards/scania-next-gen/symbols/ScaniaNextGenBodyworkSymbols.vue';
import ScaniaNextGenGeneralWarningSymbols from '@/components/dashboards/scania-next-gen/symbols/ScaniaNextGenGeneralWarningSymbols.vue';
import ScaniaNextGenIndicatorSymbols from '@/components/dashboards/scania-next-gen/symbols/ScaniaNextGenIndicatorSymbols.vue';
import Bars from '@/components/dashboards/shared/Bars.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaNextGenDashboard',
  components: {
    Dashboard,
    ScaniaNextGenGauges,
    ScaniaNextGenGaugeDisplay,
    ScaniaNextGenAdBlueBar,
    Bars,
    ScaniaNextGenBodyworkSymbols,
    ScaniaNextGenGeneralWarningSymbols,
    ScaniaNextGenIndicatorSymbols,
    ScaniaNextGenDisplay
  },
  mixins: [TelemetryMixin]
};
</script>
