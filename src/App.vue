<template>
  <main :class="`${Object.hasOwnProperty.apply( 'game', telemetry.game ) ? telemetry.game.game.name : ''}`">
    <HistoryOverlay />
    <Overlay />
    <TelemetryEventOverlay v-if="appReady" />
    <Header v-if="appReady" />
    <component
      :is="currentSkinComponent()"
      v-if="appReady"
      v-show="!menuIsDisplayed"
    />
  </main>
</template>

<script>
import DafXFDashboard         from '@/components/dashboards/DafXFDashboard';
import DefaultDashboard       from '@/components/dashboards/DefaultDashboard';
import JAGFxDashboard         from '@/components/dashboards/JAGFxDashboard';
import ManTGXDashboard        from '@/components/dashboards/ManTGXDashboard';
import MapDashboard           from '@/components/dashboards/MapDashboard';
import MercedesAtegoDashboard from '@/components/dashboards/MercedesAtegoDashboard';
import RdInfoDashboard        from '@/components/dashboards/RdInfoDashboard';
import ScaniaDashboard        from '@/components/dashboards/ScaniaDashboard';
import TestDashboard          from '@/components/dashboards/TestDashboard';
import VolvoFHDashboard       from '@/components/dashboards/VolvoFHDashboard';
import Header                 from '@/components/header/Header';
import HistoryOverlay         from '@/components/overlays/HistoryOverlay';
import Overlay                from '@/components/overlays/Overlay';
import TelemetryEventOverlay  from '@/components/overlays/telemetry-event/TelemetryEventOverlay';
import TelemetryMixin         from '@/mixins/TelemetryMixin';
import {
  loadAppConfig,
  loadGameConfig,
  setConfigActive,
  setLocale,
  connectToTelemetryServer
}                             from '@/utils/_splashScreen';
import { mapGetters }         from 'vuex';

export default {
  name:       'App',
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
    VolvoFHDashboard,
    MapDashboard,
    Overlay,
    HistoryOverlay,
    Header,
  },
  mixins: [TelemetryMixin],
  computed: {
    ...mapGetters( {
      menuIsDisplayed: 'menu/isDisplayed',
      currentSkin:     'skins/current',
      getConfig:       'config/get',
      configExist: 'config/exist',
      gameConfigLoaded: 'config/gameConfigLoaded',
      isLaunched: 'app/isLaunched'
    } )
  },
  mounted() {
    this.$store.dispatch('app/showMessage', {
      icon: null,
      title: 'Launching',
      message: 'Set startup skin'
    } )

    loadAppConfig()
    .then( setConfigActive )
    .then( setLocale )
    .then( connectToTelemetryServer )
    .then( loadGameConfig )
    .then( () => {
      this.$store.commit('app/setLaunched', true)
      this.$store.dispatch('app/endProcessing');
    } )
    .catch( e => {
      this.$store.dispatch( 'app/setError', {
        message: {
          icon: null,
          title: 'Unable to launch',
          message: 'An error occurred during the launching',
        },
        details: {
          message: e.message,
          code: 'APP_LAUNCH'
        }
      } )
    } )
  },

  methods:  {
    currentSkinComponent() {
      const currentSkin = this.currentSkin;

      if ( currentSkin === undefined || currentSkin === null )
        return null;

      return currentSkin.id + 'Dashboard';
    }
  }
};
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
