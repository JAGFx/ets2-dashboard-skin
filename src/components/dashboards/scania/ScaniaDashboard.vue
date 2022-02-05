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
      <div class="game-maxTrailerCount"></div>
      <div class="_liftrailer"></div>
      <div class="trailer-wheels"></div>
      <div class="trailer-present"></div>
      <div class="trailer-attached"></div>
      <div class="truck-wheelCount"></div>
      <div class="_liftruck"></div>
      <div class="truck-wheels"></div>

      <!--GAUGES -->
      <div
        class="truck-speed gauges"
        data-type="meter"
        data-min="10"
        data-max="120"
        data-min-angle="-120"
        data-max-angle="100"
      ></div>
      <div
        class="truck-engineRpm gauges"
        data-type="meter"
        data-min="3"
        data-max="25"
        data-min-angle="-120.5"
        data-max-angle="100"
      ></div>
      <div
        class="truck-fuel gauges"
        data-type="meter"
        data-min="0"
        data-max="truck.fuelCapacity"
        data-min-angle="-55"
        data-max-angle="56"
      ></div>
      <div
        class="truck-waterTemperature gauges"
        data-type="meter"
        data-min="40"
        data-max="100"
        data-min-angle="-55"
        data-max-angle="56"
      ></div>
      <div
        class="truck-oilPressure gauges"
        data-type="meter"
        data-min="0"
        data-max="80"
        data-min-angle="-57"
        data-max-angle="57"
      ></div>
      <div
        class="truck-fuelAverageConsumption gauges"
        data-type="meter"
        data-min="0"
        data-max="120"
        data-min-angle="-56"
        data-max-angle="57"
      ></div>

      <!-- indicators -->
      <div class="truck-odometer">
        {{ unit_length(telemetry.truck.odometer, 'km') }}
      </div>
      <div class="truck-gear">
        {{
          $trukGear(telemetry.truck.transmission, telemetry.truck.brand, false)
        }}
      </div>
      <div class="truck-shifterType">
        {{
          $trukShifterTypeLetter(
            telemetry.truck.transmission,
            telemetry.truck.brand
          )
        }}
      </div>
      <div class="truck-cruiseControlSpeed">
        {{ unit_speed(telemetry.truck.cruiseControl, true, false) }}
      </div>
      <div class="truck-cruiseControlSpeedUnit">
        {{ unit_speed(telemetry.truck.cruiseControl, false, true) }}
      </div>
      <div
        class="truck-cruiseControlOn"
        :class="{ yes: telemetry.truck.cruiseControl.enabled }"
      ></div>
      <div class="truck-digfuelConsumption"></div>
      <div class="startIcons"></div>

      <!-- infodash -->
      <div
        class="truck-electricOn"
        :class="{ yes: telemetry.truck.electric.enabled }"
      >
        <div
          class="truck-differentialLock"
          :class="{ yes: telemetry.truck.differential.lock.enabled }"
        ></div>
        <div
          class="truck-lightsParkingOn"
          :class="{ yes: telemetry.truck.brakes.parking.enabled }"
        ></div>
        <div
          class="startIcons"
          :class="{ yes: telemetry.truck.electric.enabled }"
        ></div>
        <div
          class="engineStart"
          :class="{ yes: telemetry.truck.engine.enabled }"
        ></div>
        <div
          class="truck-blinkerLeftOn"
          :class="{ yes: telemetry.truck.lights.blinker.left.active }"
        ></div>
        <div
          class="truck-blinkerRightOn"
          :class="{ yes: telemetry.truck.lights.blinker.right.active }"
        ></div>
        <div
          class="truck-lightsBeamHighOn"
          :class="{ yes: telemetry.truck.lights.beamHigh.enabled }"
        ></div>
        <div
          class="truck-lightsBeamLowOn"
          :class="{ yes: telemetry.truck.lights.beamLow.enabled }"
        ></div>
        <div class="_airPressureBar1"></div>
        <div class="truck-airGauge1"></div>
        <div class="truck-airPressureWarningOn1"></div>
        <div class="_airPressureBar2"></div>
        <div class="truck-airGauge2"></div>
        <div class="truck-airPressureWarningOn2"></div>
        <div class="truck-airSym"></div>
        <div
          class="truck-parkBrakeOn"
          :class="{ yes: telemetry.truck.lights.parking.enabled }"
        ></div>
        <div
          class="truck-retarderBrake"
          :class="{ yes: telemetry.truck.brakes.retarder.level > 0 }"
        ></div>
        <div
          class="truck-motorBrakeOn"
          :class="{ yes: telemetry.truck.brakes.motor.enabled }"
        ></div>
        <div class="datetime">
          {{
            $gameTime()
              | $dateTimeLocalized(DATE_FORMAT_NONE, TIME_FORMAT_SHORT)
          }}
        </div>
        <div
          class="truck-airPressureEmergencyOn"
          :class="{ yes: telemetry.truck.brakes.airPressure.emergency.enabled }"
        ></div>
        <div
          class="truck-fuelWarningOn"
          :class="{ yes: telemetry.truck.fuel.warning.enabled }"
        ></div>
        <div class="retarderSym"></div>
        <div class="temperature"></div>
        <div class="truck-stopWarning"></div>
        <div class="stopWarning"></div>
        <div class="truck-checkWarning"></div>
        <div class="checkWarning"></div>
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
      <!--        <Cadran-->
      <!--          v-bind="{-->
      <!--            classCSS: 'truck-speed',-->
      <!--            type: 'meter',-->
      <!--            value: telemetry.truck.speed.mph,-->
      <!--            min: 10,-->
      <!--            max: 130,-->
      <!--            minAngle: -122,-->
      <!--            maxAngle: 123-->
      <!--          }"-->
      <!--        />-->
      <!--        <div class="truck-speedRounded wrapper-area">-->
      <!--          <span>{{-->
      <!--            unit_speed(telemetry.truck.speed, true, false) | $toFixed(0)-->
      <!--          }}</span>-->
      <!--        </div>-->
      <!--        <Cadran-->
      <!--          v-bind="{-->
      <!--            classCSS: 'truck-engineRpm',-->
      <!--            type: 'meter',-->
      <!--            value: telemetry.truck.engine.rpm.value / 100,-->
      <!--            min: 3,-->
      <!--            max: 27,-->
      <!--            minAngle: -122,-->
      <!--            maxAngle: 122-->
      <!--          }"-->
      <!--        />-->
      <!--        <Cadran-->
      <!--          v-bind="{-->
      <!--            classCSS: 'truck-fuel',-->
      <!--            type: 'meter',-->
      <!--            value: telemetry.truck.fuel.value,-->
      <!--            min: 0,-->
      <!--            max: telemetry.truck.fuel.capacity,-->
      <!--            minAngle: -53,-->
      <!--            maxAngle: 53-->
      <!--          }"-->
      <!--        />-->
      <!--        <Cadran-->
      <!--          v-bind="{-->
      <!--            classCSS: 'truck-waterTemperature',-->
      <!--            type: 'meter',-->
      <!--            value: telemetry.truck.engine.waterTemperature.value,-->
      <!--            min: 40,-->
      <!--            max: 100,-->
      <!--            minAngle: -55,-->
      <!--            maxAngle: 40-->
      <!--          }"-->
      <!--        />-->
      <!--        <Cadran-->
      <!--          v-bind="{-->
      <!--            classCSS: 'truck-oilPressure',-->
      <!--            type: 'meter',-->
      <!--            value: $pressureToBar(telemetry.truck.engine.oilPressure.value),-->
      <!--            min: 0,-->
      <!--            max: 8,-->
      <!--            minAngle: -53,-->
      <!--            maxAngle: 53-->
      <!--          }"-->
      <!--        />-->
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
import Dashboard from '../Dashboard';
//import Cadran         from '../shared/Cadran';

export default {
  name: 'ScaniaDashboard',
  components: {
    Dashboard,
    ScaniaMainMenu
  },
  mixins: [TelemetryMixin]
};
</script>
