<template>
  <div :class="telemetry.truck.brand.id">
    <slot v-bind="{ skinData: skinData(), currentScale }" />
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';
import { scale } from '@/utils/telemetry/_common.utils';
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  mixins: [TelemetryMixin],
  data() {
    return {
      currentScale: 1
    };
  },
  computed: {
    ...mapGetters({
      currentSkin: 'skins/current'
    })
  },
  mounted() {
    this.updateScale();
    window.addEventListener('resize', this.updateScale);
  },
  unmounted() {
    window.removeEventListener('resize', this.updateScale);
  },
  methods: {
    skinData() {
      return this.currentSkin;
    },
    updateScale() {
      this.currentScale = scale(this.currentSkin);
    }
  }
};
</script>
