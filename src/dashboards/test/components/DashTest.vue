<template>
	<Dashboard class="test wrapper" v-slot:default="dashProps">
		<h2>{{ dashProps.truck.speed.kph }}</h2>
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
