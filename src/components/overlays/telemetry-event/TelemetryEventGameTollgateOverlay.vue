<template>
  <TelemetryEventBaseOverlay>
    <hr class="m-0 mb-4" />
    <div class="data d-flex justify-content-around align-items-center">
      <span class="data"
        >- {{ unit_currency(eventRawData.tollgate.amount) }}</span
      >
    </div>
  </TelemetryEventBaseOverlay>
</template>

<script>
import TelemetryEventBaseOverlay from '@/components/overlays/telemetry-event/TelemetryEventBaseOverlay.vue';
import TelemetryEventOverlayMixin from '@/mixins/TelemetryEventOverlayMixin.vue';

export default {
  name: 'TelemetryEventGameTollgateOverlay',
  components: {
    TelemetryEventBaseOverlay
  },
  mixins: [TelemetryEventOverlayMixin]
};
</script>
