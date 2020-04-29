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
			const tData = utils.app.initTelemetryData();
			
			//console.log( tData );
			
			return {
				telemetryData:  tData,
				configSettings: {}
			};
		},
		created() {
			let that = this;
			//console.log( 'plop' );
			utils.config.configPath()
				 .then( config => {
					 //console.log( 'Data', config );
					 that.configSettings = utils.config.configSettings( config );
				 } );
			
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
