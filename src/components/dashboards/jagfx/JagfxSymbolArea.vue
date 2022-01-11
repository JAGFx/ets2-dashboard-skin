<template>
  <div class="dash-symbol-wrapper">
    <!-- Brake parking | parkingBrake -->
    <div
      v-if="elementIsEnabled('jagfx_elements_mid_top_parkingBrake')"
      :class="{
        red: $parent.telemetry.truck.brakes.parking.enabled,
        left: sideLeft(),
        right: sideRight()
      }"
      class="dash-symbol"
    >
      <span>
        <i class="icon-parking_brakes" />
      </span>
    </div>

    <!-- Retarder | retarder -->
    <div
      v-if="elementIsEnabled('jagfx_elements_mid_top_retarder')"
      :class="{
        green: $parent.telemetry.truck.brakes.retarder.level > 0,
        left: sideLeft(),
        right: sideRight()
      }"
      class="dash-symbol"
    >
      <span>
        <i class="icon-retarder" />
      </span>
    </div>

    <!-- Beacon | beacon -->
    <div
      v-if="elementIsEnabled('jagfx_elements_mid_top_beacon')"
      :class="{
        green: $parent.telemetry.truck.lights.beacon.enabled,
        left: sideLeft(),
        right: sideRight()
      }"
      class="dash-symbol"
    >
      <span>
        <i class="icon-beacons" />
      </span>
    </div>

    <!-- Beam high | beamHigh -->
    <div
      v-if="elementIsEnabled('jagfx_elements_mid_top_beamHigh')"
      :class="{
        blue:
          $parent.telemetry.truck.lights.beamHigh.enabled &&
          $parent.telemetry.truck.lights.beamLow.enabled &&
          $parent.telemetry.truck.engine.enabled,
        left: sideLeft(),
        right: sideRight()
      }"
      class="dash-symbol"
    >
      <span>
        <i class="icon-beam_high" />
      </span>
    </div>

    <!-- Beam low | beamLow -->
    <div
      v-if="elementIsEnabled('jagfx_elements_mid_top_beamLow')"
      :class="{
        green:
          $parent.telemetry.truck.lights.beamLow.enabled &&
          $parent.telemetry.truck.engine.enabled,
        left: sideLeft(),
        right: sideRight()
      }"
      class="dash-symbol"
    >
      <span>
        <i class="icon-beam_low" />
      </span>
    </div>

    <!-- Empty -->
    <!--
			"retarder",
			"parkingBrake",
			"beamHigh",
			"beamLow",
			"beacon"
		-->
    <div
      v-for="i in indexEmptyElement()"
      :key="i"
      :class="{ left: sideLeft(), right: sideRight() }"
      class="dash-symbol disabled"
    />
  </div>
</template>

<script>
import JagfxConfigMixins from '@/components/dashboards/jagfx/JagfxConfigMixins';

export default {
  name: 'JagfxSymbolArea',
  mixins: [JagfxConfigMixins],
  props: {
    side: {
      type: String,
      required: true
    }
  },
  methods: {
    elementIsEnabled: function (elm) {
      return this.$elementIsEnabled('middle-t', elm, { side: this.side });
    },
    sideLeft: function () {
      return this.side === 'left';
    },
    sideRight: function () {
      return this.side === 'right';
    },
    indexEmptyElement: function () {
      const elementLength = this.$elementsLength('middle-t');
      const maxElement = this.maxElements['middle-t'];
      const maxElementBySide = maxElement / 2;

      let diff = 0;
      if (this.sideLeft()) {
        diff =
          elementLength > 2 ? 0 : Math.abs(elementLength - maxElementBySide);
      } else {
        diff =
          elementLength <= maxElementBySide
            ? 2
            : elementLength - maxElementBySide;

        if (elementLength > maxElementBySide) diff = 0;
      }

      return diff <= 0 ? 0 : diff;
    }
  }
};
</script>
