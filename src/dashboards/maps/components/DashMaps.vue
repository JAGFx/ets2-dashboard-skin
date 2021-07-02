<template>
  <Dashboard class="w-100 h-100">
    <MapElement></MapElement>
  </Dashboard>
</template>

<script>
import Dashboard  from '@/components/Elements/Dashboard';
import MapElement from '@/components/Elements/MapElement';

export default {
  name:       'DashMaps',
  components: {
    Dashboard,
    MapElement
  }

};
</script>
