<template>
  <Dashboard class="w-100 h-100">
    <Map />
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard.vue';
import Map from '@/components/dashboards/shared/Map.vue';

export default {
  name: 'MapDashboard',
  components: {
    Dashboard,
    Map
  }
};
</script>
