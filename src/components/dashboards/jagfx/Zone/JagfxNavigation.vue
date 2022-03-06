<template>
  <div class="nav text-center">
    <div class="icons-item-wrappers">
      <div class="dash-symbol-area">
        <!-- Left elements -->
        <JagfxSymbolArea side="left" />

        <div :class="telemetry2.truck.shifterType" class="truck-gear">
          <span v-if="telemetry2.truck.ignitionIsTurnedOn" class="value">{{
            telemetry2.truck.gearDisplayed
          }}</span>
          <span v-else class="value off">&nbsp;</span>
        </div>

        <!-- Right elements -->
        <JagfxSymbolArea side="right" />
      </div>

      <!-- Speed -->

      <div class="speed-area">
        <div class="speed-wrapper">
          <div
            v-if="
              $elementIsEnabled('middle-b', 'jagfx_elements_mid_bottom_rpm')
            "
            class="left"
          >
            <JagfxRPMBars
              v-bind="{
                engineRpm: telemetry2.truck.rpm,
                engineMaxRpm: telemetry2.truck.maxRpm,
                brandId: telemetry2.truck.brandId,
                modelId: telemetry2.truck.modelId
              }"
            />
          </div>
          <div class="middle">
            <div
              class="speed"
              :class="{ off: !telemetry2.truck.ignitionIsTurnedOn }"
            >
              <span v-if="telemetry2.truck.ignitionIsTurnedOn" class="value">{{
                telemetry2.truck.speed.toFixed(0)
              }}</span>
              <span v-else class="value">&nbsp;</span>
              <small class="unit">{{ $unitReadable('unit_speed') }}</small>
            </div>

            <div
              v-if="
                $elementIsEnabled('middle-b', 'jagfx_elements_mid_bottom_fuel')
              "
              class="fuel-level"
            >
              <span class="fuel-icon-wrapper">
                <i
                  :class="{
                    warning: onWarningLevel(),
                    disabled: !telemetry2.truck.ignitionIsTurnedOn
                  }"
                  class="icon-fuel"
                />
              </span>
              <Bars
                class="fuel-gauge"
                :level="telemetry2.truck.fuelLevel"
                :capacity="telemetry2.truck.fuelCapacity"
                :factor="7"
              />
            </div>
          </div>
          <div
            v-if="
              $elementIsEnabled('middle-b', 'jagfx_elements_mid_bottom_rpm')
            "
            class="right"
          >
            <JagfxRPMBars
              v-bind="{
                engineRpm: telemetry2.truck.rpm,
                engineMaxRpm: telemetry2.truck.maxRpm,
                brandId: telemetry2.truck.brandId,
                modelId: telemetry2.truck.modelId
              }"
            />
          </div>
        </div>
      </div>

      <div class="odometer">
        <span class="value">{{ telemetry2.truck.odometer.toFixed(0) }}</span>
        <small class="unit">{{ $unitReadable('unit_length', 'km') }}</small>
      </div>

      <!-- Speed limit -->
      <div class="bottomArea">
        <div
          v-if="
            $elementIsEnabled(
              'middle-b',
              'jagfx_elements_mid_bottom_blinker_turn'
            )
          "
          :class="{ active: telemetry2.symbols.leftDirectionIsActive }"
          class="blinkers"
        >
          <i class="icon-blinker_left" />
        </div>
        <div
          v-if="
            $elementIsEnabled(
              'middle-b',
              'jagfx_elements_mid_bottom_speedLimit'
            )
          "
          :class="{ hidden: !telemetry2.navigation.hasAnActiveSpeedLimit }"
          class="speedLimitKPH"
        >
          {{ telemetry2.navigation.speedLimitValue.toFixed(0) }}
        </div>
        <div
          v-if="
            $elementIsEnabled(
              'middle-b',
              'jagfx_elements_mid_bottom_blinker_turn'
            )
          "
          :class="{ active: telemetry2.symbols.rightDirectionIsActive }"
          class="blinkers"
        >
          <i class="icon-blinker_right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JagfxConfigMixins from '@/components/dashboards/jagfx/JagfxConfigMixins';
import JagfxSymbolArea from '@/components/dashboards/jagfx/JagfxSymbolArea';
import JagfxRPMBars from '@/components/dashboards/jagfx/Zone/JagfxRPMBars';
import Bars from '@/components/dashboards/shared/Bars';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'JagfxNavigation',
  components: { JagfxSymbolArea, JagfxRPMBars, Bars },
  mixins: [JagfxConfigMixins, TelemetryMixin],
  methods: {
    getFuelByBar: function () {
      return (
        this.telemetry2.truck.fuelCapacity * this.telemetry2.truck.fuelFactor
      ).toFixed(0);
    },
    getFuelBarCount: function () {
      return Math.ceil(
        this.telemetry2.truck.fuelCapacity / this.getFuelByBar()
      );
    },
    getFuelBarActive: function (i) {
      const fuelByBar = this.getFuelByBar();
      const iLow = i - 1;
      const fuelBarFrom = iLow * fuelByBar;

      return (
        this.telemetry2.truck.fuelLevel >= fuelBarFrom &&
        this.telemetry2.truck.ignitionIsTurnedOn
      );
    },
    onWarningLevel: function () {
      return (
        this.telemetry2.truck.fuelLevel < this.getFuelByBar() &&
        this.telemetry2.truck.ignitionIsTurnedOn
      );
    }
  }
};
</script>
