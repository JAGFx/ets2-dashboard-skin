<template>
  <div
    class="mainMenu d-flex flex-column justify-content-center align-items-center w-100"
  >
    <!-- <editor-folder> Sub menu selector -->
    <div v-if="subMenu === null">
      <div
        class="menuSelectorItem flex-area"
        @click="subMenu = 'ScaniaDrivingAssistanceMenu'"
      >
        <i class="icon-scania-menu-driving-info" />
      </div>
    </div>
    <div
      v-if="subMenu === null"
      class="w-100 d-flex justify-content-around align-items-center"
    >
      <div class="menuSelectorItem flex-area">
        <!--        @click="subMenu = 'ScaniaVehicleInformationsMenu'"-->
        <i class="icon-scania-menu-vehicle-info" />
      </div>
      <div
        class="quitMenu menuSelectorItem flex-area"
        @click="$emit('quit-menu')"
      >
        <i class="icon-scania-menu-arrow" />
      </div>
      <div
        class="menuSelectorItem flex-area"
        @click="subMenu = 'ScaniaInstantaneousDataMenu'"
      >
        <i class="icon-scania-menu-instantaneous-data" />
      </div>
    </div>
    <div v-if="subMenu === null">
      <div class="menuSelectorItem flex-area">
        <i class="icon-scania-menu-settings" />
      </div>
    </div>
    <!-- </editor-folder> Sub menu selector -->

    <component
      :is="subMenu"
      v-if="subMenu !== null"
      @click.native="subMenu = null"
    />
  </div>
</template>

<script>
import ScaniaDrivingAssistanceMenu from '@/components/dashboards/scania/display/menu/ScaniaDrivingAssistanceMenu.vue';
import ScaniaInstantaneousDataMenu from '@/components/dashboards/scania/display/menu/ScaniaInstantaneousDataMenu.vue';
import ScaniaVehicleInformationsMenu from '@/components/dashboards/scania/display/menu/ScaniaVehicleInformationsMenu.vue';
import ScaniaDisplayMessage from '@/components/dashboards/scania/display/ScaniaDisplayMessage.vue';
import ScaniaBar from '@/components/dashboards/scania/ScaniaBar.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';

export default {
  name: 'ScaniaMainMenu',
  components: {
    ScaniaBar,
    ScaniaDrivingAssistanceMenu,
    ScaniaVehicleInformationsMenu,
    ScaniaInstantaneousDataMenu,
    ScaniaDisplayMessage
  },
  mixins: [TelemetryMixin],
  data() {
    return {
      display: false,
      subMenu: this.subMenuComponent()
    };
  },
  computed: {
    mainMenuImage() {
      return this.display
        ? '/img/dashboard/scania/menuOn.png'
        : '/img/dashboard/scania/6482891_619566292.png';
    }
  },
  methods: {
    subMenuComponent() {
      const configValue = this.config('scania_default_menu');
      if (configValue === null) return null;

      return `Scania${configValue}Menu`;
    }
  }
};
</script>
