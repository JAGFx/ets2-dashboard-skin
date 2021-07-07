<template>
  <main :class="`${telemetry.game ? telemetry.game.game.name : ''}`">
    <b-overlay :show="!gameConnected" :variant="'dark'" no-wrap>
      <template v-slot:overlay>
        <div class="d-flex justify-content-center flex-column align-items-center">
          <transition mode="out-in" name="slide-fade">
            <div :key="launching.text" class="d-flex justify-content-center align-items-center flex-column">
              <h1><span class="mb-3" v-html="launching.icon"></span></h1>
              <h1 class="text-center">{{ launching.text }}</h1>
              <small class="mb-3">{{ launching.subText }}</small>
              <b-spinner label="Processing..." type="grow"></b-spinner>
            </div>
          </transition>
        </div>
      </template>
    </b-overlay>

    <History></History>

    <OverlayElement v-if="gameConnected"></OverlayElement>
    <TelemetryEventOverlay v-if="gameConnected"></TelemetryEventOverlay>
    <Game v-if="gameConnected" id="game" />
    <div v-if="gameConnected" v-show="menuIsDisplayed" class="wrapper menu h-100">
      <Menu></Menu>
    </div>
    <component v-bind:is="currentSkinComponent()" v-if="gameConnected" v-show="!menuIsDisplayed"></component>
    <!--<Events id="events" v-bind="{log}" />-->
    <!--<Controls id="controls" v-bind="{...controls, transmission: truck.transmission}" />-->
  </main>
</template>

<script>
import OverlayElement        from '@/components/Elements/OverlayElement';
import Menu                  from '@/components/menu/Menu';
import TelemetryEventOverlay from '@/components/overlays/telemetry-event/TelemetryEventOverlay';
import Game                  from '@/components/Zone/Game/Game';
import History               from '@/components/Zone/History';
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
    Game,
    Menu,
    OverlayElement,
    History
  },
  data() {
    return {
      launching: {
        icon:    '<i class="fas fa-box"></i>',
        text:    'App ready !',
        subText: 'Starting delivering'
      }
    };
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

    /*// Game connected
     setTimeout(()=> {
     this.launching = {
     icon: '<i class="fas fa-truck-loading"></i>',
     text: 'Game connected',
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
      this.launching = {
        icon:    '<i class="fas fa-truck"></i>',
        text:    'Connected to telemetry server',
        subText: 'Ready to delivering'
      };
      this.$pushALog( 'Connected to telemetry server', _history.HTY_ZONE.MAIN );

      setTimeout( () => {
        this.launching = {
          icon:    '<i class="fas fa-truck"></i>',
          text:    'Waiting game connection',
          subText: 'Run the game to start your job !'
        };
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
