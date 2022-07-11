<template>
  <div class="telemetry-event-overlay">
    <div
      class="overlay justify-content-center align-items-center d-flex"
      :class="{
        'd-flex': eventProcessing,
        'd-none': !eventProcessing
      }"
    >
      <component :is="currentRawDataComponent" v-if="eventName !== null" />
    </div>
  </div>
</template>

<script>
import TelemetryEventDefaultOverlay from '@/components/overlays/telemetry-event/TelemetryEventDefaultOverlay.vue';
import TelemetryEventGameFerryOverlay from '@/components/overlays/telemetry-event/TelemetryEventGameFerryOverlay.vue';
import TelemetryEventGameFineOverlay from '@/components/overlays/telemetry-event/TelemetryEventGameFineOverlay.vue';
import TelemetryEventGameTollgateOverlay from '@/components/overlays/telemetry-event/TelemetryEventGameTollgateOverlay.vue';
import TelemetryEventGameTrainOverlay from '@/components/overlays/telemetry-event/TelemetryEventGameTrainOverlay.vue';
import TelemetryEventJobDeliveredOverlay from '@/components/overlays/telemetry-event/TelemetryEventJobDeliveredOverlay.vue';
import TelemetryEventNavigationSpeedLimitOverlay from '@/components/overlays/telemetry-event/TelemetryEventNavigationSpeedLimitOverlay.vue';
import TelemetryEventTrailersDamageOverlay from '@/components/overlays/telemetry-event/TelemetryEventTrailersDamageOverlay.vue';
import TelemetryEventTruckCruiseControlIncreaseOverlay from '@/components/overlays/telemetry-event/TelemetryEventTruckCruiseControlIncreaseOverlay.vue';
import TelemetryEventTruckDamageOverlay from '@/components/overlays/telemetry-event/TelemetryEventTruckDamageOverlay.vue';
import TelemetryEventTruckWarningOverlay from '@/components/overlays/telemetry-event/TelemetryEventTruckWarningOverlay.vue';
import TelemetryEventOverlayMixin from '@/mixins/TelemetryEventOverlayMixin.vue';
import { eventNameToComponent } from '@/utils/_event';

export default {
  name: 'TelemetryEventOverlay',
  components: {
    TelemetryEventDefaultOverlay,
    TelemetryEventJobDeliveredOverlay,
    TelemetryEventGameFineOverlay,
    TelemetryEventGameTollgateOverlay,
    TelemetryEventGameFerryOverlay,
    TelemetryEventGameTrainOverlay,
    TelemetryEventNavigationSpeedLimitOverlay,
    TelemetryEventTrailersDamageOverlay,
    TelemetryEventTruckCruiseControlIncreaseOverlay,
    TelemetryEventTruckWarningOverlay,
    TelemetryEventTruckDamageOverlay
  },
  mixins: [TelemetryEventOverlayMixin],
  computed: {
    currentRawDataComponent() {
      const eventComponentName = eventNameToComponent(this.eventName);

      try {
        require(`./${eventComponentName}`);
        return eventComponentName;
      } catch (e) {
        return 'TelemetryEventDefaultOverlay';
      }
    }
  }
};
</script>
