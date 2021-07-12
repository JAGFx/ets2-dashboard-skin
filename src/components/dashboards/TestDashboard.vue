<template>
	<Dashboard class="test wrapper">
		<div class="speed">
			<span class="value">{{ unit_speed( telemetry.truck.speed, true, false ) | $toFixed( 0 ) }}</span>
			<small class="unit">{{ unit_speed( telemetry.truck.speed, false )}}</small>
		</div>
	</Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard';

export default {
  name:       'TestDashboard',
  components: {
    Dashboard
  }
};
</script>
