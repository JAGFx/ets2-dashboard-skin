<template>
	<div :class="telemetry.truck.brand.id">
		<slot v-bind="{ skinData: skinData() }"></slot>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name:     'Dashboard',
  methods:  {
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
