<template>
	<Dashboard class="jagfx wrapper">
		<div class="zone-wrapper">
			<div class="left">
				<Trailer id="trailers" />
				<Job id="job" />
			</div>
		</div>
		<Navigation id="navigation" />
		<div class="zone-wrapper">
			<Truck id="truck" />
		</div>
	</Dashboard>
</template>

<script>
	import Dashboard  from '../../../components/Elements/Dashboard';
	//import AppDashMixins from '../../../components/Mixins/AppDashMixins';
	import Job        from './Zone/Job/Job';
	import Trailer    from './Zone/Job/Trailer';
	import Navigation from './Zone/Navigation/Navigation';
	import Truck      from './Zone/Truck/Truck';
	
	export default {
		name:       'DashJAGFx',
		//mixins:     [ AppDashMixins ],
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
