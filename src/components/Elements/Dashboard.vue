<template>
	<div :class="telemetryData.truck.brand.id" class="wrapper" v-on:update-data="update">
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
			update( data ) {
				//console.log( 'Data updated' );
				data.map( elm => this[ elm ] );
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
