<template>
  <div>
    <div
      :class="eventName.replace('.', '-')"
      class="item d-flex justify-content-center align-items-center"
    >
      <span class="ico m-4 p-3 d-flex justify-content-center align-items-center">
        <i :class="eventsText()[ eventName ].icon" />
      </span>
      <div class="event d-flex justify-content-between align-items-start flex-column">
        <span class="title">{{ eventsText()[ eventName ].title }}</span>
        <small class="sub-title font-italic">{{ eventsText()[ eventName ].subtitle }}</small>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import eventsText                 from '@/data/events.json';
import TelemetryEventOverlayMixin from '@/mixins/TelemetryEventOverlayMixin';

export default {
  name:    'TelemetryEventBaseOverlay',
  mixins:  [ TelemetryEventOverlayMixin ],
  methods: {
    eventsText() {
      return eventsText;
    }
  }
};
</script>
