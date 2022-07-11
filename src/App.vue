<template>
  <main
    :class="`${
      Object.hasOwnProperty.apply('game', telemetry.game)
        ? telemetry.game.game.name
        : ''
    }`"
  >
    <HistoryOverlay />
    <Overlay />
    <TelemetryEventOverlay v-if="$telemetryDataIsEnough()" />
    <Header v-if="$telemetryDataIsEnough()" />
    <component
      :is="currentSkinComponent()"
      v-if="$telemetryDataIsEnough()"
      v-show="!menuIsDisplayed"
    />
  </main>
</template>

<script>
import DafXFDashboard from '@/components/dashboards/DafXFDashboard.vue';
import DefaultDashboard from '@/components/dashboards/DefaultDashboard.vue';
import JAGFxDashboard from '@/components/dashboards/jagfx/JAGFxDashboard.vue';
import ManTGXDashboard from '@/components/dashboards/ManTGXDashboard.vue';
import MapDashboard from '@/components/dashboards/MapDashboard.vue';
import MercedesAtegoDashboard from '@/components/dashboards/MercedesAtegoDashboard.vue';
import RdInfoDashboard from '@/components/dashboards/RdInfoDashboard.vue';
import ScaniaNextGenDashboard from '@/components/dashboards/scania-next-gen/ScaniaNextGenDashboard.vue';
import ScaniaDashboard from '@/components/dashboards/scania/ScaniaDashboard.vue';
import TestDashboard from '@/components/dashboards/TestDashboard.vue';
import VolvoFHDashboard from '@/components/dashboards/VolvoFHDashboard.vue';
import Header from '@/components/header/Header.vue';
import HistoryOverlay from '@/components/overlays/HistoryOverlay.vue';
import Overlay from '@/components/overlays/Overlay.vue';
import TelemetryEventOverlay from '@/components/overlays/telemetry-event/TelemetryEventOverlay.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';
import {
  loadAppConfig,
  loadGameConfig,
  setConfigActive,
  setLocale,
  connectToTelemetryServer,
  waitingTruckSpawn
} from '@/utils/_splashScreen';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    TelemetryEventOverlay,
    JAGFxDashboard,
    TestDashboard,
    DafXFDashboard,
    DefaultDashboard,
    ManTGXDashboard,
    MercedesAtegoDashboard,
    RdInfoDashboard,
    ScaniaDashboard,
    ScaniaNextGenDashboard,
    VolvoFHDashboard,
    MapDashboard,
    Overlay,
    HistoryOverlay,
    Header
  },
  mixins: [TelemetryMixin],
  computed: {
    ...mapGetters({
      menuIsDisplayed: 'menu/isDisplayed',
      currentSkin: 'skins/current',
      getConfig: 'config/get',
      configExist: 'config/exist',
      gameConfigLoaded: 'config/gameConfigLoaded',
      isLaunched: 'app/isLaunched'
    })
  },
  mounted() {
    this.$store.dispatch('app/showMessage', {
      icon: null,
      title: 'Launching',
      message: 'Set startup skin'
    });

    loadAppConfig()
      .then(setConfigActive)
      .then(setLocale)
      .then(connectToTelemetryServer)
      .then(loadGameConfig)
      .then(waitingTruckSpawn)
      .then(() => {
        this.$store.commit('app/setLaunched', true);
        this.$store.dispatch('app/endProcessing');
      })
      .catch((e) => {
        this.$store.dispatch('app/setError', {
          message: {
            icon: null,
            title: 'Unable to launch',
            message: 'An error occurred during the launching'
          },
          details: {
            message: e.message,
            code: 'APP_LAUNCH'
          }
        });
      });
  },

  methods: {
    currentSkinComponent() {
      const currentSkin = this.currentSkin;

      if (currentSkin === undefined || currentSkin === null) return null;

      return currentSkin.id + 'Dashboard';
    }
  }
};
</script>

<style lang="scss">
@import 'assets/scss/app';
</style>
