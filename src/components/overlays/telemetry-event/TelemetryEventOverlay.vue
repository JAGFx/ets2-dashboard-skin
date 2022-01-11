<template>
  <div class="telemetry-event-overlay">
    <b-overlay :show="eventProcessing" :variant="'dark'" no-wrap>
      <template #overlay>
        <component :is="currentRawDataComponent" />
      </template>
    </b-overlay>
  </div>
</template>

<script>
import TelemetryEventDefaultOverlay from '@/components/overlays/telemetry-event/TelemetryEventDefaultOverlay';
import TelemetryEventGameFerryOverlay from '@/components/overlays/telemetry-event/TelemetryEventGameFerryOverlay';
import TelemetryEventGameFineOverlay from '@/components/overlays/telemetry-event/TelemetryEventGameFineOverlay';
import TelemetryEventGameTollgateOverlay from '@/components/overlays/telemetry-event/TelemetryEventGameTollgateOverlay';
import TelemetryEventGameTrainOverlay from '@/components/overlays/telemetry-event/TelemetryEventGameTrainOverlay';
import TelemetryEventJobDeliveredOverlay from '@/components/overlays/telemetry-event/TelemetryEventJobDeliveredOverlay';
import TelemetryEventNavigationSpeedLimitOverlay from '@/components/overlays/telemetry-event/TelemetryEventNavigationSpeedLimitOverlay';
import TelemetryEventTrailersDamageOverlay from '@/components/overlays/telemetry-event/TelemetryEventTrailersDamageOverlay';
import TelemetryEventTruckCruiseControlIncreaseOverlay from '@/components/overlays/telemetry-event/TelemetryEventTruckCruiseControlIncreaseOverlay';
import TelemetryEventTruckDamageOverlay from '@/components/overlays/telemetry-event/TelemetryEventTruckDamageOverlay';
import TelemetryEventTruckWarningOverlay from '@/components/overlays/telemetry-event/TelemetryEventTruckWarningOverlay';
import TelemetryEventOverlayMixin from '@/mixins/TelemetryEventOverlayMixin';
import { event } from '@/utils/utils';

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
      const eventComponentName = event.eventNameToComponent(this.eventName);

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
