<template>
  <div :class="telemetry.truck.brand.id">
    <slot v-bind="{ skinData: skinData(), currentScale }"></slot>
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
  methods:  {
    skinData() {
      return this.currentSkin;
    },
    updateScale() {
      this.currentScale = this.$scale( this.currentSkin );
    }
  },
  created() {
    this.updateScale();
    window.addEventListener( 'resize', this.updateScale );
  },
  destroyed() {
    window.removeEventListener( 'resize', this.updateScale );
  },
  computed: {
    ...mapGetters( {
      currentSkin: 'skins/current'
    } )
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/common/dashboard";
</style>
