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
        <div class="unit">{{ unit_length(1, 'km', false, true) }}</div>
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
        <div class="unit">{{ unit_speed(100, false, true) }}</div>
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
          {{
            unit_consumption(
              telemetry.truck.fuel.avgConsumption,
              true,
              false
            ).toFixed(1)
          }}
        </div>
        <div class="unit">
          {{
            unit_consumption(telemetry.truck.fuel.avgConsumption, false, true)
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaDrivingAssistanceMenu',
  mixins: [TelemetryMixin]
};
</script>
