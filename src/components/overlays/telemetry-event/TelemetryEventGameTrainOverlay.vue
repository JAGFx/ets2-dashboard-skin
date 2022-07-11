<template>
  <TelemetryEventBaseOverlay>
    <hr class="m-0 mb-4" />
    <div class="data d-flex justify-content-around align-items-center">
      <div
        class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column"
      >
        <span class="title">{{ $t('From') }}</span>
        <span class="data">{{ eventRawData.train.source.name }}</span>
      </div>
      <div
        class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column"
      >
        <span class="title">{{ $t('To') }}</span>
        <span class="data">{{ eventRawData.train.target.name }}</span>
      </div>
      <div
        class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column"
      >
        <span class="title">{{ $t('Cost') }}</span>
        <span class="data">{{ unit_currency(eventRawData.train.amount) }}</span>
      </div>
    </div>
  </TelemetryEventBaseOverlay>
</template>

<script>
import TelemetryEventBaseOverlay from '@/components/overlays/telemetry-event/TelemetryEventBaseOverlay.vue';
import TelemetryEventOverlayMixin from '@/mixins/TelemetryEventOverlayMixin.vue';

export default {
  name: 'TelemetryEventGameTrainOverlay',
  components: {
    TelemetryEventBaseOverlay
  },
  mixins: [TelemetryEventOverlayMixin]
};
</script>
