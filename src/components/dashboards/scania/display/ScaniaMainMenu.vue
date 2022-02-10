<template>
  <div
    class="mainMenu d-flex flex-column justify-content-center align-items-center w-100"
  >
    <!-- <editor-folder> Sub menu selector -->
    <div v-if="subMenu === null">
      <div class="menuSelectorItem flex-area" @click="subMenu = '01'">
        <i class="icon-scania-menu-driving-info" />
      </div>
    </div>
    <div
      v-if="subMenu === null"
      class="w-100 d-flex justify-content-around align-items-center"
    >
      <div class="menuSelectorItem flex-area" @click="subMenu = '03'">
        <i class="icon-scania-menu-vehicle-info" />
      </div>
      <div
        class="quitMenu menuSelectorItem flex-area"
        @click="$emit('quit-menu')"
      >
        <i class="icon-scania-menu-arrow" />
      </div>
      <div class="menuSelectorItem flex-area" @click="subMenu = '02'">
        <i class="icon-scania-menu-instantaneous-data" />
      </div>
    </div>
    <div v-if="subMenu === null">
      <div class="menuSelectorItem flex-area">
        <i class="icon-scania-menu-settings" />
      </div>
    </div>
    <!-- </editor-folder> Sub menu selector -->

    <!-- <editor-folder> Driving assistance -->
    <div
      v-if="subMenu === '01'"
      class="drivingAssistanceMenu w-100 h-100 d-flex justify-content-center align-items-start flex-column"
      @click="subMenu = null"
    >
      <ScaniaBar
        class="my-2"
        v-bind="{
          min: 0,
          max: $psiToCurrentPressureUnit(175),
          value: 0,
          unit: config('unit_pressure'),
          disabled: true
        }"
      >
        <i class="icon icon-scania-retarder_green" />
      </ScaniaBar>
      <ScaniaBar
        class="my-2"
        v-bind="{
          min: 0,
          max: $psiToCurrentPressureUnit(175),
          value: 0,
          unit: config('unit_pressure'),
          disabled: true
        }"
      >
        <i class="icon icon-scania-retarder_green" />
      </ScaniaBar>
      <ScaniaBar
        class="my-2"
        v-bind="{
          min: 0,
          max: $psiToCurrentPressureUnit(175),
          value: unit_pressure(
            telemetry.truck.brakes.airPressure.value,
            true,
            false
          ),
          unit: config('unit_pressure')
        }"
      >
        <i class="icon icon-scania-parking-break_red" />
      </ScaniaBar>
      <!--      <span class="drivingAssistanceMenu-unit">[bar]</span>-->
    </div>
    <!-- </editor-folder> Driving assistance -->

    <!-- <editor-folder> Vehicle information -->
    <div
      v-if="subMenu === '03'"
      class="vehicleInformationsMenu w-100 h-100"
      @click="subMenu = null"
    >
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
    <!-- </editor-folder> Vehicle information -->

    <!-- <editor-folder> Instantaneous data -->
    <div
      v-if="subMenu === '02'"
      class="instantaneousData d-flex justify-content-center align-items-start flex-column w-100 h-100"
      @click="subMenu = null"
    >
      <ScaniaBar
        class="my-2"
        v-bind="{
          min: 20,
          max: 36,
          value: telemetry.truck.engine.batteryVoltage.value,
          unit: 'V',
          displayMidLabel: false
        }"
      >
        <i class="icon icon-scania-battery_red" />
      </ScaniaBar>
      <ScaniaBar
        class="my-2"
        v-bind="{
          min: 0,
          max: $psiToCurrentPressureUnit(102),
          value: unit_pressure(
            telemetry.truck.engine.oilPressure.value,
            true,
            false
          ),
          unit: config('unit_pressure')
        }"
      >
        <i class="icon icon-scania-oil-pressure_red_yellow" />
      </ScaniaBar>
      <ScaniaBar
        class="my-2"
        v-bind="{
          min: 0,
          max: 100,
          value:
            (telemetry.truck.adBlue.value * 100) /
            telemetry.truck.adBlue.capacity,
          unit: '%'
        }"
      >
        <i class="icon icon-scania-ad-blue-low_yellow" />
      </ScaniaBar>
    </div>
    <!-- </editor-folder> Instantaneous data -->
  </div>
</template>

<script>
import ScaniaBar from '@/components/dashboards/scania/ScaniaBar';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaMainMenu',
  components: { ScaniaBar },
  mixins: [TelemetryMixin],
  data() {
    return {
      display: false,
      subMenu: null
    };
  },
  computed: {
    mainMenuImage() {
      return this.display
        ? '/img/dashboard/scania/menuOn.png'
        : '/img/dashboard/scania/menuOff.png';
    }
  }
};
</script>
