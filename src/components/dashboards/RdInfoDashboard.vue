<template>
  <Dashboard v-slot="dashProps" class="rd-info-dash wrapper">
    <div
      class="dashboard game-connected yes"
      :style="{
        transform:
          'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
        width: dashProps.skinData.size.width + 'px',
        height: dashProps.skinData.size.height + 'px'
      }"
    >
      <div :class="{ yes: telemetry.job.cargo.id }" class="hasJob">
        <!-- meters -->
        <div class="truck-wearEngine wrapper-area">
          <span>{{ (telemetry.truck.damage.engine * 100).toFixed(0) }}%</span>
        </div>
        <div class="truck-wearTransmission wrapper-area">
          <span
            >{{ (telemetry.truck.damage.transmission * 100).toFixed(0) }}%</span
          >
        </div>
        <div class="truck-wearCabin wrapper-area">
          <span>{{ (telemetry.truck.damage.cabin * 100).toFixed(0) }}%</span>
        </div>
        <div class="truck-wearWheels wrapper-area">
          <span>{{ (telemetry.truck.damage.wheels * 100).toFixed(0) }}%</span>
        </div>
        <div class="truck-wearChassis wrapper-area">
          <span>{{ (telemetry.truck.damage.chassis * 100).toFixed(0) }}%</span>
        </div>
        <div class="trailer-wear wrapper-area">
          <span>{{ (telemetry.trailer.cargo.damage * 100).toFixed(0) }} %</span>
        </div>
        <div class="truck-make wrapper-area">
          <span>{{ telemetry.truck.brand.name }}</span>
        </div>
        <div
          :class="{ yes: telemetry.truck.lights.beamHigh.enabled }"
          class="truck-lightsBeamHighOn"
        />
        <div
          :class="{ yes: telemetry.truck.lights.beamLow.enabled }"
          class="truck-lightsBeamLowOn"
        />
        <div
          :class="{ yes: telemetry.truck.lights.parking.enabled }"
          class="truck-lightsParkingOn"
        />
        <div
          :class="{ yes: telemetry.truck.cruiseControl.enabled }"
          class="truck-cruiseControlOn"
        />
        <div
          :class="{ yes: telemetry.truck.brakes.parking.enabled }"
          class="truck-parkBrakeOn"
        />
        <div
          :class="{ yes: telemetry.truck.brakes.airPressure.warning.enabled }"
          class="_airPressureOn"
        />
        <div class="truck-fuel">
          {{ unit_volume(telemetry.truck.fuel.value) }}
        </div>
        <div class="truck-fuelAverageConsumption">
          {{
            unit_consumption(
              telemetry.truck.fuel.avgConsumption,
              true,
              false
            ).toFixed(1)
          }}
        </div>
        <div class="_fuelAvg">
          {{ unit_consumption(telemetry.truck.fuel.avgConsumption, false) }}
        </div>
        <div
          :style="{ width: telemetry.controls.game.brake * 606 + 'px' }"
          class="_gameBrakeBar"
        />
        <div
          :style="{ width: telemetry.controls.input.brake * 606 + 'px' }"
          class="_userBrakeBar"
        />
        <div
          :style="{ width: telemetry.controls.game.throttle * 606 + 'px' }"
          class="_gameThrottleBar"
        />
        <div
          :style="{ width: telemetry.controls.input.throttle * 606 + 'px' }"
          class="_userThrottleBar"
        />
        <div
          :class="{
            yes:
              telemetry.truck.lights.blinker.left.active ||
              telemetry.truck.lights.blinker.right.active
          }"
          class="_dangerWarning"
        />
        <div
          :class="{ yes: telemetry.truck.lights.parking.enabled }"
          class="_auxLights"
        />
        <div
          :class="{
            yes:
              telemetry.truck.lights.auxFront.value !== 0 ||
              telemetry.truck.lights.auxRoof.value !== 0
          }"
          class="truck-lightsParkingOn"
        />
        <div class="navigation-speedLimit">
          {{ telemetry2.navigation.speedLimitValue.toFixed(0) }}
        </div>

        <div class="truck-displayedGear wrapper-area">
          <span>{{ telemetry2.truck.gearDisplayed }}</span>
        </div>
        <!-- indicators -->

        <div class="job-remainingTime wrapper-area">
          <span v-if="telemetry2.job.deliveryTimeIsSetToDuDate">{{
            $dateTimeLocalized(
              telemetry.job.expectedDeliveryTimestamp.value,
              DATE_FORMAT_LONG,
              TIME_FORMAT_SHORT
            )
          }}</span>
          <span v-else>{{
            $jobRemainingTimeDelivery(telemetry.job.deliveryTime.unix)
          }}</span>
        </div>
        <div class="job-sourceCity wrapper-area">
          <span>{{ telemetry.job.source.city.name }}</span>
        </div>
        <div class="job-destinationCity wrapper-area">
          <span>{{ telemetry.job.destination.city.name }}</span>
        </div>
        <div class="_jobIncome wrapper-area">
          <span
            ><span class="job-income">{{
              unit_currency(telemetry.job.income)
            }}</span></span
          >
        </div>
        <div class="trailer-name wrapper-area">
          <span>{{ telemetry.trailer.model.name }}</span>
        </div>
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '@/components/dashboards/Dashboard';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'RdInfoDashboard',
  components: {
    Dashboard
  },
  mixins: [TelemetryMixin]
};
</script>
