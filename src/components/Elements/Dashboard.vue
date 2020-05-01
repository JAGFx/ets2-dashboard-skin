<template>
	<div :class="telemetryData.truck.brand.id" v-on:update-data="update">
		<div id="overlay" v-show="enabledFullScreen()"></div>
		<slot v-bind="{ ...telemetryData }"></slot>
	</div>
</template>

<script>
	import * as utils from '../../utils/utils';
	
	export default {
		name:    'Dashboard',
		data() {
			return {
				telemetryData: utils.app.initTelemetryData()
			};
		},
		methods: {
			enabledFullScreen() {
				return process.env.VUE_APP_ENABLE_FULLSCREEN === 'true';
			},
			update( data ) {
				//console.log( 'Data updated' );
				data.map( elm => this[ elm ] );
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/common/dashboard";
</style>
