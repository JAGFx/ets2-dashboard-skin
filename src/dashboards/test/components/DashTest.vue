<template>
	<Dashboard class="test wrapper">
		<div class="speed">
			<span class="value">{{ unit_speed( telemetry.truck.speed, true, false ) | $toFixed( 0 ) }}</span>
			<small class="unit">{{ unit_speed( telemetry.truck.speed, false )}}</small>
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
