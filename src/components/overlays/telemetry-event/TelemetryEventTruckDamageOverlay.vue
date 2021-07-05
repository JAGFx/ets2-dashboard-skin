<template>
  <TelemetryEventBaseOverlay>
    <hr class="m-0 mb-4">
    <div class="data d-flex justify-content-around align-items-center">
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Cabin</span>
        <span class="data">{{ (eventRawData.damages.cabin * 100) | $toFixed(2) }} %</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Chassis</span>
        <span class="data">{{ (eventRawData.damages.chassis * 100) | $toFixed(2) }} %</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Engine</span>
        <span class="data">{{ (eventRawData.damages.engine * 100) | $toFixed(2) }} %</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Transmission</span>
        <span class="data">{{ (eventRawData.damages.transmission * 100) | $toFixed(2) }} %</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Wheels</span>
        <span class="data">{{ (eventRawData.damages.wheels * 100) | $toFixed(2) }} %</span>
      </div>
    </div>
  </TelemetryEventBaseOverlay>
</template>

<script>
import AppEventOverlayMixins from '@/components/Mixins/AppEventOverlayMixins';

import eventsText                from '../../../data/events.json';
import TelemetryEventBaseOverlay from './TelemetryEventBaseOverlay';

export default {
  name:       'TelemetryEventTruckDamageOverlay',
  mixins:     [ AppEventOverlayMixins ],
  components: {
    TelemetryEventBaseOverlay
  },
  methods:    {
    eventsText() {
      return eventsText;
    }
  }
};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/app/eventOverlay";
</style>
