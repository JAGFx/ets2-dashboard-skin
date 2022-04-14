<template>
  <div class="display on">
    <div class="squareArea driveMode">
      <div>TM</div>
      <div>?</div>
    </div>
    <div class="menu-selector w-100">
      <div class="button tiny left white">
        <span>WA</span>
      </div>
      <div class="wrapper">
        <div class="button">TI</div>
        <div
          class="button"
          :class="{
            active: currentMenu === 'ScaniaNextGenDrivingAssistanceMenu'
          }"
          @click="toggleMenu('ScaniaNextGenDrivingAssistanceMenu')"
        >
          DA
        </div>
        <div
          class="button"
          :class="{
            active: currentMenu === 'ScaniaNextGenInstantaneousDataMenu'
          }"
          @click="toggleMenu('ScaniaNextGenInstantaneousDataMenu')"
        >
          ID
        </div>
        <div class="button">ME</div>
      </div>
      <div class="button tiny right">
        <span>SE</span>
      </div>
    </div>
    <!--    <div class="menu h-100"></div>-->
    <!--    <ScaniaNextGenInstantaneousDataMenu />-->
    <!--    <ScaniaNextGenDrivingAssistanceMenu />-->
    <component :is="currentMenu" v-if="currentMenu !== null" />
    <div v-else class="menu h-100">Toto</div>
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
import ScaniaBar from '@/components/dashboards/scania/ScaniaBar';
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
