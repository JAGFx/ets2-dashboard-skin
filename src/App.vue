<template>
  <main :class="`${telemetry.game ? telemetry.game.game.name : ''}`">
    <LoadingOverlay />
    <HistoryOverlay />
    <Overlay v-if="gameConnected" />
    <TelemetryEventOverlay v-if="gameConnected" />
    <Header />
    <component v-bind:is="currentSkinComponent()" v-if="gameConnected" v-show="!menuIsDisplayed" />
  </main>
</template>

<script>
import Header                from '@/components/header/Header';
import HistoryOverlay        from '@/components/overlays/HistoryOverlay';
import LoadingOverlay        from '@/components/overlays/LoadingOverlay';
import Overlay               from '@/components/overlays/Overlay';
import TelemetryEventOverlay from '@/components/overlays/telemetry-event/TelemetryEventOverlay';
import DashDafXF             from '@/dashboards/daf-xf/components/DashDafXF';
import DashDefault           from '@/dashboards/defaut/components/DashDefault';
import DashJAGFx             from '@/dashboards/jagfx/components/DashJAGFx';
import DashManTGX            from '@/dashboards/man-tgx/components/DashManTGX';
import DashMaps              from '@/dashboards/maps/components/DashMaps';
import DashMercedesAtego     from '@/dashboards/mercedes-atego/components/DashMercedesAtego';
import DashRdInfo            from '@/dashboards/rd-info/components/DashRdInfo';
import DashScania            from '@/dashboards/scania/components/DashScania';
import DashTest              from '@/dashboards/test/components/DashTest';
import DashVolvoFH           from '@/dashboards/volvo-fh/components/DashVolvoFH';
import _history              from '@/utils/_history';
import { mapGetters }        from 'vuex';

export default {
  name:       'app',
  components: {
    TelemetryEventOverlay,
    DashJAGFx,
    DashTest,
    DashDefault,
    DashDafXF,
    DashManTGX,
    DashMercedesAtego,
    DashRdInfo,
    DashScania,
    DashVolvoFH,
    DashMaps,
    Overlay,
    HistoryOverlay,
    Header,
    LoadingOverlay
  },

  created() {
    this.$pushALog( 'App launched', _history.HTY_ZONE.MAIN );

    this.$store
        .dispatch( 'config/load' )
        .then( () => {
          this.$pushALog( 'Config loaded', _history.HTY_ZONE.MAIN );

          const skinToLoad = this.getConfig( 'general_skin_on_load' );

          try {
            //console.log( skinToLoad );
            this.$store.commit( 'skins/setConfigActive', skinToLoad );

          } catch ( e ) {
            //console.error( e );
            this.$pushALog( 'Value set in "general_skin_on_load" was not a valid skin: ' + skinToLoad,
                _history.HTY_ZONE.MAIN,
                _history.HTY_LEVEL.ERROR );
            this.$store.dispatch( 'skins/setFirstActive' );
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
      const currentSkin = this.currentSkin; //this.$store.getters[ 'skins/current' ];

      if ( currentSkin === undefined || currentSkin === null )
        return null;

      return 'Dash' + currentSkin.id;
    }
  },
  computed: {
    ...mapGetters( {
      menuIsDisplayed: 'menu/isDisplayed',
      currentSkin:     'skins/current',
      getConfig:       'config/get'
    } )
  },
  sockets:    {
    disconnect() {
      console.log( 'disconnected' );
    },
    connect() {
      console.log( 'connected' );
      this.$store.commit( 'app/setLaunch', {
        icon:    '<i class="fas fa-truck"></i>',
        text:    'Connected to telemetry server',
        subText: 'Ready to delivering'
      } );
      this.$pushALog( 'Connected to telemetry server', _history.HTY_ZONE.MAIN );

      setTimeout( () => {
        this.$store.commit( 'app/setLaunch', {
          icon:    '<i class="fas fa-truck"></i>',
          text:    'Waiting game connection',
          subText: 'Run the game to start your job !'
        } );
        this.$pushALog( 'Waiting game connection', _history.HTY_ZONE.MAIN );
      }, 5000 );
    },
    update( data ) {
      this.$updateTelemetry( { ...data } );
    }
  }
};
</script>

<style lang="scss">
@import "assets/scss/app/app";
</style>
