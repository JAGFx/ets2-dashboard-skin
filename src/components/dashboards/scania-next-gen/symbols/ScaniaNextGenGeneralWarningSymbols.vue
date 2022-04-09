<template>
  <div>
    <div class="symbols indicator left">
      <div class="symbol green">
        <i
          v-if="telemetry2.symbols.leftDirectionIsActive"
          class="icon-scania-direction-indicator-left_green"
        />
      </div>
    </div>
    <div class="general-warning">
      <div class="symbols">
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol red">
          <i
            v-if="telemetry2.symbols.brakePressureIsActive"
            class="icon-scania-break-pressure_red_yellow"
          />
        </div>
        <div class="symbol red">
          <i
            v-if="telemetry2.truck.hasErrors"
            class="icon-scania-warning_red"
          />
        </div>
        <div class="symbol blue">
          <i
            v-if="telemetry2.symbols.mainBeamIsEnabled"
            class="icon-scania-main-beam_blue"
          />
        </div>
        <div class="symbol yellow">
          <i
            v-if="telemetry2.truck.hasWarnings"
            class="icon-scania-warning_yellow"
          />
        </div>
        <div class="symbol red">
          <i
            v-if="telemetry2.symbols.parkingBrakeIsEnabled"
            class="icon-scania-parking-break_red"
          />
        </div>
        <div class="symbol"></div>
        <div class="symbol red">
          <i
            v-if="telemetry2.truck.ignitionStart"
            class="icon-scania-driver-safty-belt_red"
          />
        </div>
        <div class="symbol"></div>
      </div>
    </div>
    <div class="symbols indicator right">
      <div class="symbol green">
        <i
          v-if="telemetry2.symbols.rightDirectionIsActive"
          class="icon-scania-direction-indicator-right_green"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaNextGenGeneralWarningSymbols',
  mixins: [TelemetryMixin]
};
</script>
