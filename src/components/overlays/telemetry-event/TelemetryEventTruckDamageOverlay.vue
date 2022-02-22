<template>
  <TelemetryEventBaseOverlay>
    <hr class="m-0 mb-4" />
    <div class="data d-flex justify-content-around align-items-center">
      <div
        class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column"
      >
        <span class="title">Cabin</span>
        <span class="data"
          >{{ $toFixed(eventRawData.damages.cabin * 100, 2) }} %</span
        >
      </div>
      <div
        class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column"
      >
        <span class="title">Chassis</span>
        <span class="data"
          >{{ $toFixed(eventRawData.damages.chassis * 100, 2) }} %</span
        >
      </div>
      <div
        class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column"
      >
        <span class="title">Engine</span>
        <span class="data"
          >{{ $toFixed(eventRawData.damages.engine * 100, 2) }} %</span
        >
      </div>
      <div
        class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column"
      >
        <span class="title">Transmission</span>
        <span class="data"
          >{{ $toFixed(eventRawData.damages.transmission * 100, 2) }} %</span
        >
      </div>
      <div
        class="item px-3 py-1 mx-1 d-flex justify-content-between align-items-center flex-column"
      >
        <span class="title">Wheels</span>
        <span class="data"
          >{{ $toFixed(eventRawData.damages.wheels * 100, 2) }} %</span
        >
      </div>
    </div>
  </TelemetryEventBaseOverlay>
</template>

<script>
import TelemetryEventBaseOverlay from '@/components/overlays/telemetry-event/TelemetryEventBaseOverlay';
import TelemetryEventOverlayMixin from '@/mixins/TelemetryEventOverlayMixin';

export default {
  name: 'TelemetryEventTruckDamageOverlay',
  components: {
    TelemetryEventBaseOverlay
  },
  mixins: [TelemetryEventOverlayMixin]
};
</script>
