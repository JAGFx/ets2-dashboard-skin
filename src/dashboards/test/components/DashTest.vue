<template>
	<Dashboard class="test wrapper" v-slot:default="dashProps">
		<div class="speed">
			<span class="value">{{dashProps.truck.speed.kph}}</span>
			<small class="unit">km/h</small>
		</div>
	</Dashboard>
</template>

<script>
	import Dashboard from '../../../components/Elements/Dashboard';
	
	export default {
		name:       'DashTest',
		components: {
			Dashboard
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/test";
</style>
