<template>
  <TelemetryEventBaseOverlay />
</template>

<script>
import TelemetryEventBaseOverlay from '@/components/overlays/telemetry-event/TelemetryEventBaseOverlay';
import eventsText                from '@/data/events.json';

export default {
  name:       'TelemetryEventDefaultOverlay',
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
