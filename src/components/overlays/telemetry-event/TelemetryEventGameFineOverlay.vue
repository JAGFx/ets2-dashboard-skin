<template>
  <TelemetryEventBaseOverlay>
    <hr class="m-0 mb-4">
    <div class="data d-flex justify-content-around align-items-center">
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">{{ eventRawData.fine.offence.name }}</span>
        <span class="data">- {{ unit_currency( eventRawData.fine.amount ) }}</span>
      </div>
    </div>
  </TelemetryEventBaseOverlay>
</template>

<script>
import AppEventOverlayMixins from '@/components/Mixins/AppEventOverlayMixins';

import eventsText                from '../../../data/events.json';
import TelemetryEventBaseOverlay from './TelemetryEventBaseOverlay';

export default {
  name:       'TelemetryEventGameFineOverlay',
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
