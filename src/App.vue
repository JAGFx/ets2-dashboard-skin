<template>
  <main :class="`${Object.hasOwnProperty.apply( 'game', telemetry.game ) ? telemetry.game.game.name : ''}`">
    <LoadingOverlay :display="gameConnected" />
    <HistoryOverlay />
    <Overlay v-if="gameConnected" />
    <TelemetryEventOverlay v-if="gameConnected" />
    <Header />
    <component
      :is="currentSkinComponent()"
      v-if="gameConnected"
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
import LoadingOverlay         from '@/components/overlays/LoadingOverlay';
import Overlay                from '@/components/overlays/Overlay';
import TelemetryEventOverlay  from '@/components/overlays/telemetry-event/TelemetryEventOverlay';
import TelemetryMixin                   from '@/mixins/TelemetryMixin';
import { changeLocale, fallbackLocale } from '@/utils/_i18n';
import { history }                      from '@/utils/utils';
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
    LoadingOverlay
  },
  mixins: [TelemetryMixin],
  computed: {
    ...mapGetters( {
      menuIsDisplayed: 'menu/isDisplayed',
      currentSkin:     'skins/current',
      getConfig:       'config/get',
      configExist: 'config/exist'
    } )
  },
  mounted() {
    this.$pushALog( 'App launched', history.HTY_ZONE.MAIN );

    this.$store
        .dispatch( 'config/load' )
        .then( () => {
          this.$pushALog( 'Config loaded', history.HTY_ZONE.MAIN );

          const skinToLoad = this.config( 'general_skin_on_load' );

          try {
            this.$store.commit( 'skins/setConfigActive', skinToLoad );

          } catch ( e ) {
            this.$pushALog( 'Value set in "general_skin_on_load" was not a valid skin: ' + skinToLoad,
                history.HTY_ZONE.MAIN,
                history.HTY_LEVEL.ERROR );
            this.$store.dispatch( 'skins/setFirstActive' );
          }

          const locale = this.config( 'general_skin_locale' );
          try {
            changeLocale( locale )

          } catch ( e ) {
            this.$pushALog( `Value set in "general_skin_locale" was not a valid skin: ${locale}. Revert to fallback locale: ${fallbackLocale}`,
                history.HTY_ZONE.MAIN,
                history.HTY_LEVEL.ERROR );
            changeLocale( fallbackLocale )
          }
        } );

    /*// HeaderGameInformation connected
     setTimeout(()=> {
     this.launching = {
     icon: '<i class="fas fa-truck-loading"></i>',
     text: 'HeaderGameInformation connected',
     subText: 'Delivering'
     }
     }, 6000);

     // After game connected + 3s
     setTimeout(()=> {
     this.launching = {
     icon: '<i class="fas fa-box-open"></i>',
     text: 'Finished',
     subText: 'Delivered'
     }
     }, 9000);*/
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
