<template>
  <div>
    <div
      :class="eventName.replace('.', '-')"
      class="item d-flex justify-content-center align-items-center"
    >
      <span
        class="ico m-4 p-3 d-flex justify-content-center align-items-center"
      >
        <i :class="eventsText.icon" />
      </span>
      <div
        class="event d-flex justify-content-between align-items-start flex-column"
      >
        <span class="title">{{ $t(eventsText.title) }}</span>
        <small class="sub-title font-italic">{{
          $t(eventsText.subtitle)
        }}</small>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import TelemetryEventOverlayMixin from '@/mixins/TelemetryEventOverlayMixin.vue';

export default {
  name: 'TelemetryEventBaseOverlay',
  mixins: [TelemetryEventOverlayMixin]
};
</script>
