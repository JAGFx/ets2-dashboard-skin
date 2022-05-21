<template>
  <div class="menu h-100 instantaneousData" @click="onClickArea">
    <h4 v-if="subMenu === 'battery'">Battery voltage</h4>
    <ScaniaNextGenBar
      v-if="subMenu === 'battery'"
      v-bind="{
        min: 20,
        max: 36,
        value: telemetry2.truck.batteryVoltage,
        unit: 'V',
        displayMidLabel: false
      }"
    >
      <i class="icon icon-scania-battery_red" />
    </ScaniaNextGenBar>
    <h4 v-if="subMenu === 'pressure'">Brake pressure</h4>
    <ScaniaNextGenBar
      v-if="subMenu === 'pressure'"
      class="py-1"
      v-bind="{
        min: 0,
        max: 175,
        value: telemetry2.truck.brakeAirPressure,
        unit: $unitReadable('unit_pressure')
      }"
    >
      <i class="icon icon-scania-parking-break_red" />
    </ScaniaNextGenBar>
    <h4 v-if="subMenu === 'adBlue'">Ad blue</h4>
    <ScaniaNextGenBar
      v-if="subMenu === 'adBlue'"
      v-bind="{
        min: 0,
        max: 100,
        value:
          (telemetry2.truck.adBlueLevel * 100) /
          telemetry2.truck.adBlueCapacity,
        unit: '%'
      }"
    >
      <i class="icon icon-scania-ad-blue-low_yellow" />
    </ScaniaNextGenBar>
    <div class="subMenuIndicator">
      <div class="square" :class="{ active: subMenu === 'battery' }"></div>
      <div class="square" :class="{ active: subMenu === 'pressure' }"></div>
      <div class="square" :class="{ active: subMenu === 'adBlue' }"></div>
    </div>
  </div>
</template>

<script>
import ScaniaNextGenBar from '@/components/dashboards/scania-next-gen/display/ScaniaNextGenBar';
import TelemetryMixin from '@/mixins/TelemetryMixin';

const subMenuAvailable = ['battery', 'pressure', 'adBlue'];

export default {
  name: 'ScaniaNextGenInstantaneousDataMenu',
  components: { ScaniaNextGenBar },
  mixins: [TelemetryMixin],
  data() {
    return {
      subMenu: subMenuAvailable[0]
    };
  },
  methods: {
    onClickArea() {
      const subMenuSize = subMenuAvailable.length - 1;
      const currentSubMenuIndex = subMenuAvailable.indexOf(this.subMenu);
      const nextSubMenu =
        currentSubMenuIndex + 1 > subMenuSize ? 0 : currentSubMenuIndex + 1;

      this.subMenu = subMenuAvailable[nextSubMenu];
    }
  }
};
</script>
