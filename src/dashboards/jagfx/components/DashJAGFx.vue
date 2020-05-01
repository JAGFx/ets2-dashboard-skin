<template>
	<Dashboard class="jagfx wrapper" v-slot:default="dashProps">
		<div class="zone-wrapper">
			<div class="left">
				<Trailer id="trailers" v-bind="{...dashProps.trailer, cargo: dashProps.job.cargo}" />
				<Job id="job" v-bind="{...dashProps.job, game: dashProps.game.game, distance: dashProps.navigation.distance}" />
			</div>
		</div>
		<Navigation id="navigation" v-bind="{...dashProps.navigation, ...dashProps.truck, gameTime: dashProps.game.time.unix}" />
		<div class="zone-wrapper">
			<Truck id="truck" v-bind="{...dashProps.truck}" />
		</div>
	</Dashboard>
</template>

<script>
	import Dashboard  from '../../../components/Elements/Dashboard';
	import Job        from './Zone/Job/Job';
	import Trailer    from './Zone/Job/Trailer';
	import Navigation from './Zone/Navigation/Navigation';
	import Truck      from './Zone/Truck/Truck';
	
	export default {
		name:       'DashJAGFx',
		components: {
			Dashboard,
			Navigation,
			Job,
			Truck,
			Trailer
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/jagfx";
</style>
