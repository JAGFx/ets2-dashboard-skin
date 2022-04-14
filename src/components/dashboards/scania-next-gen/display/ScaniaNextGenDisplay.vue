<template>
  <div class="display on">
    <div class="squareArea driveMode">
      <div><i class="icon icon-scania-next-gen-standard-mode_white" /></div>
      <div><i class="icon icon-scania-cruise_control_white" /></div>
    </div>
    <div class="menu-selector w-100">
      <div class="button tiny left white">
        <i class="icon icon-scania-next-gen-menu-warning_white_yellow_red" />
      </div>
      <div class="wrapper">
        <div class="button">
          <i class="icon icon-scania-next-gen-vehicle-information" />
        </div>
        <div
          class="button"
          :class="{
            active: currentMenu === 'ScaniaNextGenDrivingAssistanceMenu'
          }"
          @click="toggleMenu('ScaniaNextGenDrivingAssistanceMenu')"
        >
          <i class="icon icon-scania-next-gen-trip-information" />
        </div>
        <div
          class="button"
          :class="{
            active: currentMenu === 'ScaniaNextGenInstantaneousDataMenu'
          }"
          @click="toggleMenu('ScaniaNextGenInstantaneousDataMenu')"
        >
          <i class="icon icon-scania-next-gen-instantaneous-data" />
        </div>
        <div class="button"><i class="icon icon-scania-next-gen-media" /></div>
      </div>
      <div class="button tiny right">
        <i class="icon icon-scania-next-gen-settings" />
      </div>
    </div>
    <component :is="currentMenu" v-if="currentMenu !== null" />
    <div v-else class="menu h-100 default"></div>
    <div class="programmable-field">programmable-field-bottom</div>
    <div class="squareArea shifter">
      <div>{{ telemetry2.truck.gearDisplayedWithoutShifterType }}</div>
      <div>{{ telemetry2.truck.shifterTypeLetter }}</div>
    </div>
  </div>
</template>

<script>
import ScaniaNextGenDrivingAssistanceMenu from '@/components/dashboards/scania-next-gen/display/menu/ScaniaNextGenDrivingAssistanceMenu';
import ScaniaNextGenInstantaneousDataMenu from '@/components/dashboards/scania-next-gen/display/menu/ScaniaNextGenInstantaneousDataMenu';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaNextGenDisplay',
  components: {
    ScaniaNextGenInstantaneousDataMenu,
    ScaniaNextGenDrivingAssistanceMenu
  },
  mixins: [TelemetryMixin],
  data() {
    return {
      currentMenu: null
    };
  },
  methods: {
    toggleMenu(target) {
      this.currentMenu = this.currentMenu === target ? null : target;
    }
  }
};
</script>
