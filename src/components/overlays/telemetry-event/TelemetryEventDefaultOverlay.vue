<template>
  <TelemetryEventBaseOverlay></TelemetryEventBaseOverlay>
</template>

<script>
import eventsText                from '../../../data/events.json';
import TelemetryEventBaseOverlay from './TelemetryEventBaseOverlay';

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

<style lang="scss" scoped>
	@import "../../../assets/scss/app/eventOverlay";
</style>
