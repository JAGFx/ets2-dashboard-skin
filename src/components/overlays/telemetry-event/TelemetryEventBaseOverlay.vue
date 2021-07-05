<template>
	<div>
    <div :class="eventName.replace('.', '-')" class="item d-flex justify-content-center align-items-center">
					<span class="ico m-4 p-3 d-flex justify-content-center align-items-center">
						<i :class="eventsText()[ eventName ].icon"></i>
					</span>
      <div class="event d-flex justify-content-between align-items-start flex-column">
        <span class="title">{{ eventsText()[ eventName ].title }}</span>
        <small class="sub-title font-italic">{{ eventsText()[ eventName ].subtitle }}</small>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import AppEventOverlayMixins from '@/components/Mixins/AppEventOverlayMixins';

import eventsText from '../../../data/events.json';

export default {
  name:    'TelemetryEventBaseOverlay',
  mixins:  [ AppEventOverlayMixins ],
  methods: {
    eventsText() {
      return eventsText;
    }
  }
};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/app/eventOverlay";
</style>
