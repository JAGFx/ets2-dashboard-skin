<template>
  <TelemetryEventBaseOverlay>
    <hr class="m-0 mb-4">
    <div class="data d-flex justify-content-around align-items-center">
      <span class="data">- {{ unit_currency( eventRawData.tollgate.amount ) }}</span>
    </div>
  </TelemetryEventBaseOverlay>
</template>

<script>
import TelemetryEventBaseOverlay  from '@/components/overlays/telemetry-event/TelemetryEventBaseOverlay';
import eventsText                 from '@/data/events.json';
import TelemetryEventOverlayMixin from '@/mixins/TelemetryEventOverlayMixin';

export default {
  name:       'TelemetryEventGameTollgateOverlay',
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

<style lang="scss" scoped>
	@import "../../../assets/scss/app/eventOverlay";
</style>
