<template>
  <div :class="telemetry.truck.brand.id">
    <slot v-bind="{ skinData: skinData(), currentScale }" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name:     'Dashboard',
  data() {
    return {
      currentScale: 1
    };
  },
  computed: {
    ...mapGetters( {
      currentSkin: 'skins/current'
    } )
  },
  created() {
    this.updateScale();
    window.addEventListener( 'resize', this.updateScale );
  },
  destroyed() {
    window.removeEventListener( 'resize', this.updateScale );
  },
  methods:  {
    skinData() {
      return this.currentSkin;
    },
    updateScale() {
      this.currentScale = this.$scale( this.currentSkin );
    }
  }
};
</script>
