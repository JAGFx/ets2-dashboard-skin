<template>
	<div :class="telemetry.truck.brand.id">
		<div id="overlay" v-show="enabledFullScreen()"></div>
		<slot v-bind="{ skinData: skinData() }"></slot>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name:     'Dashboard',
  methods:  {
    enabledFullScreen() {
      return process.env.VUE_APP_ENABLE_FULLSCREEN === 'true';
    },
    skinData() {
      return this.currentSkin;
    }
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
