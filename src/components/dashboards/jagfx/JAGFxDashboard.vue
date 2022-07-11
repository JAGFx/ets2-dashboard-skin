<template>
  <Dashboard v-slot="dashProps" class="jagfx wrapper">
    <div
      class="dashboard"
      :style="{
        transform:
          'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
        width: dashProps.skinData.size.width + 'px',
        height: dashProps.skinData.size.height + 'px'
      }"
    >
      <div class="zone-wrapper w-100">
        <div class="left">
          <JagfxTrailer id="trailers" />
          <JagfxJob id="job" />
        </div>
      </div>
      <JagfxNavigation id="navigation" class="w-100" />
      <div class="zone-wrapper w-100 h-100">
        <JagfxTruck id="truck" />
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard.vue';
import JagfxJob from '@/components/dashboards/jagfx/Zone/JagfxJob.vue';
import JagfxNavigation from '@/components/dashboards/jagfx/Zone/JagfxNavigation.vue';
import JagfxTrailer from '@/components/dashboards/jagfx/Zone/JagfxTrailer.vue';
import JagfxTruck from '@/components/dashboards/jagfx/Zone/JagfxTruck.vue';

export default {
  name: 'JAGFxDashboard',
  components: {
    Dashboard,
    JagfxNavigation,
    JagfxJob,
    JagfxTruck,
    JagfxTrailer
  }
};
</script>
