<template>
  <div class="nav text-center">
    <div class="icons-item-wrappers">
      <div class="dash-symbol-area">
        <!-- Left elements -->
        <JagfxSymbolArea side="left" />

        <div
          :class="telemetry.truck.transmission.shifterType"
          class="truck-gear"
        >
          <span class="value">{{
            $trukGear(telemetry.truck.transmission, telemetry.truck.brand)
          }}</span>
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
                engine: telemetry.truck.engine,
                brand: telemetry.truck.brand,
                model: telemetry.truck.model
              }"
            />
          </div>
          <div class="middle">
            <div class="speed">
              <span class="value">{{
                unit_speed(telemetry.truck.speed, true, false) | $toFixed(0)
              }}</span>
              <small class="unit">{{
                unit_speed(telemetry.truck.speed, false)
              }}</small>
            </div>

            <div
              v-if="
                $elementIsEnabled('middle-b', 'jagfx_elements_mid_bottom_fuel')
              "
              class="fuel-level"
            >
              <span class="fuel-icon-wrapper">
                <i :class="{ warning: onWarningLevel() }" class="icon-fuel" />
              </span>

              <div class="bars">
                <div
                  v-for="i in getFuelBarCount()"
                  :key="i"
                  :class="{ active: getFuelBarActive(i) }"
                  class="bar"
                />
              </div>
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
                engine: telemetry.truck.engine,
                brand: telemetry.truck.brand,
                model: telemetry.truck.model
              }"
            />
          </div>
        </div>
      </div>

      <div class="odometer">
        <span class="value">{{
          unit_length(telemetry.truck.odometer, 'km', true, false) | $toFixed(0)
        }}</span>
        <small class="unit">{{
          unit_length(telemetry.truck.odometer, 'km', false)
        }}</small>
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
          :class="{ active: telemetry.truck.lights.blinker.left.active }"
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
          :class="{ hidden: telemetry.navigation.speedLimit.value === 0 }"
          class="speedLimitKPH"
        >
          {{ unit_speed(telemetry.navigation.speedLimit, true, false) }}
        </div>
        <div
          v-if="
            $elementIsEnabled(
              'middle-b',
              'jagfx_elements_mid_bottom_blinker_turn'
            )
          "
          :class="{ active: telemetry.truck.lights.blinker.right.active }"
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
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'JagfxNavigation',
  components: { JagfxSymbolArea, JagfxRPMBars },
  mixins: [JagfxConfigMixins, TelemetryMixin],
  methods: {
    getFuelByBar: function () {
      return (
        this.telemetry.truck.fuel.capacity *
        this.telemetry.truck.fuel.warning.factor
      ).toFixed(0);
    },
    getFuelBarCount: function () {
      return Math.ceil(
        this.telemetry.truck.fuel.capacity / this.getFuelByBar()
      );
    },
    getFuelBarActive: function (i) {
      const fuelByBar = this.getFuelByBar();
      const iLow = i - 1;
      const fuelBarFrom = iLow * fuelByBar;

      return this.telemetry.truck.fuel.value >= fuelBarFrom;
    },
    onWarningLevel: function () {
      return this.telemetry.truck.fuel.value < this.getFuelByBar();
    }
  }
};
</script>
