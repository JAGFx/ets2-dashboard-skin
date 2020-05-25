<template>
	<div :class="truck.brand.id">
		<div id="overlay" v-show="enabledFullScreen()"></div>
		<slot v-bind="{ skinData: skinData() }"></slot>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import dashMixins     from '../Mixins/dashMixins';
	
	export default {
		name:    'Dashboard',
		mixins:  [ dashMixins ],
		methods: {
			enabledFullScreen() {
				return process.env.VUE_APP_ENABLE_FULLSCREEN === 'true';
			},
			/*telemetryData() {
			 return this.pickData()();
			 },*/
			skinData() {
				return this.currentSkin();
			},
			...mapGetters( {
				//pickData:    'telemetry/pick',
				currentSkin: 'skins/current'
			} )
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/common/dashboard";
</style>
