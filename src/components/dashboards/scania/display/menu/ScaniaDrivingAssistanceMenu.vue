<template>
  <div
    class="drivingAssistanceMenu w-100 h-100 d-flex justify-content-center align-items-start flex-column"
  >
    <div
      class="item d-flex justify-content-between align-items-center w-100 py-2"
    >
      <div class="icon flex-area">
        <i class="icon-scania-total-distance-driven_white" />
        <small class="text-uppercase">tot</small>
      </div>
      <div class="flex-area">
        <div class="value">-</div>
        <div class="unit">{{ $unitReadable('unit_length', 'km') }}</div>
      </div>
    </div>

    <div
      class="item d-flex justify-content-between align-items-center w-100 py-2"
    >
      <div class="icon flex-area">
        <i class="icon-scania-average-vehicle-speed_white" />
        <small class="text-uppercase">ave</small>
      </div>
      <div class="flex-area">
        <div class="value">-</div>
        <div class="unit">{{ $unitReadable('unit_speed') }}</div>
      </div>
    </div>

    <div
      class="item d-flex justify-content-between align-items-center w-100 py-2"
    >
      <div class="icon flex-area">
        <i class="icon-scania-fuel_yellow" />
        <small class="text-uppercase">ave</small>
      </div>
      <div class="flex-area">
        <div class="value">
          {{ telemetry2.truck.fuelAverageConsumption.toFixed(1) }}
        </div>
        <div class="unit">
          {{ $unitReadable('unit_consumption') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaDrivingAssistanceMenu',
  mixins: [TelemetryMixin]
};
</script>
