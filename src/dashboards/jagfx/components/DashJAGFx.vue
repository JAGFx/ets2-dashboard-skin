<template>
  <Dashboard v-slot:default="dashProps" class="jagfx wrapper">
    <div class="dashboard" v-bind:style="{
			transform: 'scale(' + $scale( dashProps.skinData ) + ') translate(-50%, -50%)',
			width: dashProps.skinData.size.width + 'px',
			height: dashProps.skinData.size.height + 'px',
		}">
      <div class="zone-wrapper w-100">
        <div class="left">
          <Trailer id="trailers" />
          <Job id="job" />
        </div>
      </div>
      <Navigation id="navigation" class="w-100" />
      <div class="zone-wrapper w-100">
        <Truck id="truck" />
      </div>
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
