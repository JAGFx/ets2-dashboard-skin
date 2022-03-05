<template>
  <Dashboard v-slot="dashProps" class="scania-next-gen wrapper">
    <div
      class="dashboard"
      :style="{
        transform:
          'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
        width: dashProps.skinData.size.width + 'px',
        height: dashProps.skinData.size.height + 'px'
      }"
    >
      HOHOHO
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard';

export default {
  name: 'ScaniaNextGenDashboard',
  components: { Dashboard }
};
</script>
