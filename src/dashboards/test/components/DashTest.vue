<template>
	<Dashboard class="test wrapper">
		<div class="speed">
			<span class="value">{{ unit_speed( truck.speed, true, false )}}</span>
			<small class="unit">km/h</small>
		</div>
	</Dashboard>
</template>

<script>
	import Dashboard     from '../../../components/Elements/Dashboard';
	import AppDashMixins from '../../../components/Mixins/AppDashMixins';
	
	export default {
		name:       'DashTest',
		components: {
			Dashboard
		},
		mixins:     [ AppDashMixins ]
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/test";
</style>
