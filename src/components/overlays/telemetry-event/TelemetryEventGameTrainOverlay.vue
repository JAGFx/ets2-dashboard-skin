<template>
  <TelemetryEventBaseOverlay>
    <hr class="m-0 mb-4">
    <div class="data d-flex justify-content-around align-items-center">
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">From</span>
        <span class="data">{{ eventRawData.train.source.name }}</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">To</span>
        <span class="data">{{ eventRawData.train.target.name }}</span>
      </div>
      <div class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column">
        <span class="title">Cost</span>
        <span class="data">{{ unit_currency( eventRawData.train.amount ) }}</span>
      </div>
    </div>
  </TelemetryEventBaseOverlay>
</template>

<script>
import TelemetryEventBaseOverlay  from '@/components/overlays/telemetry-event/TelemetryEventBaseOverlay';
import eventsText                 from '@/data/events.json';
import TelemetryEventOverlayMixin from '@/mixins/TelemetryEventOverlayMixin';

export default {
  name:       'TelemetryEventGameTrainOverlay',
  mixins:     [ TelemetryEventOverlayMixin ],
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
