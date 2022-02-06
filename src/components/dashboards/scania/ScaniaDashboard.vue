<template>
  <Dashboard v-slot="dashProps" class="scania-dash wrapper">
    <div
      class="dashboard game-connected"
      :class="{ yes: telemetry.truck.electric.enabled }"
      :style="{
        transform:
          'scale(' + dashProps.currentScale + ') translate(-50%, -50%)',
        width: dashProps.skinData.size.width + 'px',
        height: dashProps.skinData.size.height + 'px'
      }"
    >
      <div
        class="dashLights"
        :class="{ yes: telemetry.truck.electric.enabled }"
      ></div>
      <div
        class="dash"
        :class="{ yes: telemetry.truck.electric.enabled }"
      ></div>
      <!-- Liftable Axles -->
      <div class="tractor-tag-axle-raised flex-area symbol">
        <i class="icon-scania-tractor-tag-axle-raised_yellow" />
      </div>
      <div class="trailer-tag-axle-raised flex-area symbol">
        <i class="icon-scania-trailer-tag-axle-raised_yellow" />
      </div>
      <div
        v-if="telemetry.truck.lights.beacon.enabled"
        class="rotating-light flex-area symbol"
      >
        <i class="icon-scania-rotating-beacon_blue" />
      </div>
      <div class="driver-safty-belt flex-area symbol">
        <i class="icon-scania-driver-safty-belt_red" />
      </div>

      <!--GAUGES -->
      <Cadran
        v-bind="{
          classCSS: 'truck-speed',
          type: 'meter',
          value: telemetry.truck.speed.kph,
          min: 10,
          max: 130,
          minAngle: -122,
          maxAngle: 123
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-engineRpm',
          type: 'meter',
          value: telemetry.truck.engine.rpm.value / 100,
          min: 3,
          max: 27,
          minAngle: -122,
          maxAngle: 122
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-fuel',
          type: 'meter',
          value: telemetry.truck.fuel.value,
          min: 0,
          max: telemetry.truck.fuel.capacity,
          minAngle: -53,
          maxAngle: 53
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-waterTemperature',
          type: 'meter',
          value: telemetry.truck.engine.waterTemperature.value,
          min: 40,
          max: 100,
          minAngle: -55,
          maxAngle: 40
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-oilPressure',
          type: 'meter',
          value: $pressureToBar(telemetry.truck.engine.oilPressure.value),
          min: 0,
          max: 8,
          minAngle: -53,
          maxAngle: 53
        }"
      />
      <Cadran
        v-bind="{
          classCSS: 'truck-fuelAverageConsumption',
          type: 'meter',
          value: unit_consumption(
            telemetry.truck.fuel.avgConsumption,
            true,
            false
          ),
          min: 0,
          max: 120,
          minAngle: -56,
          maxAngle: 57
        }"
      />

      <div class="icons-bar d-flex justify-content-start align-items-center">
        <div class="truck-fuelWarning flex-area">
          <i class="icon-scania-fuel_yellow" />
        </div>
      </div>

      <!-- indicators -->
      <div class="truck-odometer flex-area justify-content-start">
        <span class="pl-3">{{
          unit_length(telemetry.truck.odometer, 'km')
        }}</span>
      </div>
      <div class="truck-gear flex-area">
        <span>
          {{
            $trukGear(
              telemetry.truck.transmission,
              telemetry.truck.brand,
              false
            )
          }}
        </span>
      </div>
      <div class="truck-shifterType flex-area">
        <span>{{
          $trukShifterTypeLetter(
            telemetry.truck.transmission,
            telemetry.truck.brand
          )
        }}</span>
      </div>
      <div class="truck-cruiseControlSpeed">
        {{ unit_speed(telemetry.truck.cruiseControl, true, false) }}
      </div>
      <div class="truck-cruiseControlSpeedUnit">
        {{ unit_speed(telemetry.truck.cruiseControl, false, true) }}
      </div>
      <div class="startIcons"></div>

      <!-- infodash -->
      <div
        class="truck-electricOn"
        :class="{ yes: telemetry.truck.electric.enabled }"
      >
        <div
          v-if="telemetry.truck.differential.lock.enabled"
          class="truck-differentialLock flex-area symbol"
        >
          <i class="icon-scania-differential-lock_yellow" />
        </div>
        <div
          class="startIcons"
          :class="{ yes: telemetry.truck.electric.enabled }"
        ></div>
        <div
          v-if="telemetry.truck.engine.enabled"
          class="engine-failure flex-area symbol"
        >
          <i class="icon-scania-engine-failure_yellow" />
        </div>
        <div
          v-if="telemetry.truck.lights.blinker.left.active"
          class="truck-blinkerLeft flex-area"
        >
          <i class="icon-scania-direction-indicator-left_green" />
        </div>
        <div
          v-if="telemetry.truck.lights.blinker.right.active"
          class="truck-blinkerRight flex-area"
        >
          <i class="icon-scania-direction-indicator-right_green" />
        </div>
        <div
          v-if="telemetry.truck.lights.beamHigh.enabled"
          class="truck-lightsBeamHigh flex-area symbol"
        >
          <i class="icon-scania-main-beam_blue" />
        </div>
        <!--        <div class="_airPressureBar1"></div>-->
        <!--        <div class="truck-airGauge1"></div>-->
        <!--        <div class="truck-airPressureWarningOn1"></div>-->
        <!--        <div class="_airPressureBar2"></div>-->
        <!--        <div class="truck-airGauge2"></div>-->
        <!--        <div class="truck-airPressureWarningOn2"></div>-->
        <div class="truck-brake-pressure flex-area symbol">
          <i class="icon-scania-break-pressure_red_yellow" />
        </div>
        <div
          v-if="telemetry.truck.lights.parking.enabled"
          class="truck-parkBrake flex-area symbol"
        >
          <i class="icon-scania-parking-break_red" />
        </div>
        <div class="datetime flex-area">
          <span>
            {{
              $gameTime()
                | $dateTimeLocalized(DATE_FORMAT_NONE, TIME_FORMAT_TINY)
            }}
          </span>
        </div>
        <div
          class="truck-airPressureEmergencyOn"
          :class="{ yes: telemetry.truck.brakes.airPressure.emergency.enabled }"
        ></div>
        <!--        <div-->
        <!--          class="truck-fuelWarningOn"-->
        <!--          :class="{ yes: telemetry.truck.fuel.warning.enabled }"-->
        <!--        ></div>-->
        <div
          v-if="telemetry.truck.brakes.retarder.level > 0"
          class="retarder flex-area symbol"
        >
          <i class="icon-scania-retarder_green" />
        </div>
        <div class="temperature flex-area justify-content-end">
          <span class="pr-3">--°C</span>
        </div>
        <div class="truck-stopWarning flex-area symbol">
          <i class="icon-scania-warning_red" />
        </div>
        <div class="truck-checkWarning flex-area symbol">
          <i class="icon-scania-warning_yellow" />
        </div>
      </div>

      <ScaniaMainMenu />
      <!--      <div :class="{ yes: telemetry.job.cargo.id }" class="hasJob">-->
      <!-- meters -->
      <!--
          Attributes:
          data-min-angle: angle in degress for the arrow for data-min value (0 = vertical, negative = left, positive = right)
          data-max-angle: an gle in degress for the arrow for data-max value (0 = vertical, negative = left, positive = right)
          data-min: minimal possible value (as in JSON response), you may also use any telemetry property name for dynamic values
          data-max: maximum possible value (as in JSON response), you may also use any telemetry property name for dynamic values
          -->

      <!--        <div class="truck-odometer wrapper-area">-->
      <!--          <span>{{-->
      <!--            unit_length(telemetry.truck.odometer, 'km', true, false)-->
      <!--              | $toFixed(0)-->
      <!--          }}</span>-->
      <!--        </div>-->
      <!--        &lt;!&ndash;				<div class="truck-cruiseControlSpeedRounded wrapper-area"><span>{{ telemetry.truck.cruiseControl.kph }}</span></div>&ndash;&gt;-->
      <!--        <div class="truck-gear wrapper-area">-->
      <!--          <span>{{-->
      <!--            $trukGear(telemetry.truck.transmission, telemetry.truck.brand)-->
      <!--          }}</span>-->
      <!--        </div>-->
      <!--        &lt;!&ndash; indicators &ndash;&gt;-->
      <!--        <div-->
      <!--          :class="{ yes: telemetry.truck.lights.blinker.left.active }"-->
      <!--          class="truck-blinkerLeftOn"-->
      <!--        />-->
      <!--        <div-->
      <!--          :class="{ yes: telemetry.truck.lights.blinker.right.active }"-->
      <!--          class="truck-blinkerRightOn"-->
      <!--        />-->
      <!--        <div-->
      <!--          :class="{ yes: telemetry.truck.cruiseControl.enabled }"-->
      <!--          class="truck-cruiseControlOn"-->
      <!--        />-->
      <!--        <div-->
      <!--          :class="{ yes: telemetry.truck.lights.beamHigh.enabled }"-->
      <!--          class="truck-lightsBeamHighOn"-->
      <!--        />-->
      <!--        <div-->
      <!--          :class="{ yes: telemetry.truck.lights.beamLow.enabled }"-->
      <!--          class="truck-lightsBeamLowOn"-->
      <!--        />-->
      <!--        <div-->
      <!--          :class="{ yes: telemetry.truck.lights.parking.enabled }"-->
      <!--          class="truck-lightsParkingOn"-->
      <!--        />-->
      <!--        &lt;!&ndash;				<div :class="{'yes': trailer.attached}" class="trailer-attached"></div>&ndash;&gt;-->
      <!--        <div-->
      <!--          :class="{ yes: telemetry.truck.brakes.parking.enabled }"-->
      <!--          class="truck-parkBrakeOn"-->
      <!--        />-->
      <!--        <div class="trailer-mass wrapper-area">-->
      <!--          <span-->
      <!--            >{{-->
      <!--              unit_weight(telemetry.job.cargo.mass, true, false) | $toFixed(1)-->
      <!--            }}<span class="ton">{{-->
      <!--              unit_weight(telemetry.job.cargo.mass, false)-->
      <!--            }}</span></span-->
      <!--          >-->
      <!--        </div>-->
      <!--        &lt;!&ndash;				<div class="trailer-name">{{ telemetry.job.cargo.name }}</div>&ndash;&gt;-->
      <!--        <div class="game-time wrapper-area">-->
      <!--          <span>{{-->
      <!--            $gameTime()-->
      <!--              | $dateTimeLocalized(DATE_FORMAT_SHORT, TIME_FORMAT_SHORT)-->
      <!--          }}</span>-->
      <!--        </div>-->
      <!--        <div-->
      <!--          :class="{ yes: telemetry.truck.brakes.airPressure.emergency.enabled }"-->
      <!--          class="truck-airPressureEmergencyOn"-->
      <!--        />-->
      <!--        <div-->
      <!--          :class="{ yes: telemetry.truck.fuel.warning.enabled }"-->
      <!--          class="truck-fuelWarningOn"-->
      <!--        />-->

      <!--				<div :class="{ 'yes': telemetry.truck.brakes.airPressure.warning.enabled }" class="truck-airPressureWarningOn"></div>-->
      <!--				<div class="truck-retarderBrake">{{ telemetry.truck.brakes.retarder.level > 0 ? 'On' : 'Off' }}</div>-->
      <!--				<div class="truck-oilTemperature">{{ telemetry.truck.engine.oilTemperature.value.toFixed(0) }}</div>-->
      <!--				<div class="truck-batteryVoltage">{{ telemetry.truck.engine.batteryVoltage.warning.factor.toFixed(0) }}</div>-->
      <!--      </div>-->
    </div>
  </Dashboard>
</template>

<script>
import ScaniaMainMenu from '@/components/dashboards/scania/menu/ScaniaMainMenu';
import TelemetryMixin from '@/mixins/TelemetryMixin';
import Dashboard from '@/components/dashboards/Dashboard';
import Cadran from '@/components/dashboards/shared/Cadran';

export default {
  name: 'ScaniaDashboard',
  components: {
    Dashboard,
    ScaniaMainMenu,
    Cadran
  },
  mixins: [TelemetryMixin]
};
</script>
