<template>
  <div class="vehicleInformationsMenu w-100 h-100">
    <i class="icon-scania-menu-weight-truck background" />
    <div class="totalmass flex-area">
      <span>3</span>
    </div>
    <div class="trailer-attached">
      <div class="frontAxleLoad flex-area">
        <span>4</span>
      </div>
      <div class="rearAxleLoad flex-area">
        <span>5</span>
      </div>
      <div class="trailerAxleLoad flex-area">
        <span>-.-</span>
      </div>
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaVehicleInformationsMenu',
  mixins: [TelemetryMixin]
};
</script>
