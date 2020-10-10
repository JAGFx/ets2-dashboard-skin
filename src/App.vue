<template>
  <main :class="`${telemetry.game && telemetry.game.game.id === 2 ? 'ats' : 'ets2'}`">
    <b-overlay :show="!gameConnected" :variant="'dark'" no-wrap>
      <template v-slot:overlay>
        <div class="d-flex justify-content-center flex-column align-items-center">
          <transition mode="out-in" name="slide-fade">
            <div :key="launching.text" class="d-flex justify-content-center align-items-center flex-column">
              <h1><span class="mb-3" v-html="launching.icon"></span></h1>
              <h1>{{ launching.text }}</h1>
              <small class="mb-3">{{ launching.subText }}</small>
              <b-spinner label="Processing..." type="grow"></b-spinner>
            </div>
          </transition>
        </div>
      </template>
    </b-overlay>

    <OverlayElement v-if="gameConnected"></OverlayElement>
    <EventOverlayElement v-if="gameConnected"></EventOverlayElement>
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
import _event              from '@/utils/_event';
import { mapGetters }      from 'vuex';
import EventOverlayElement from './components/Elements/EventOverlayElement';
import OverlayElement      from './components/Elements/OverlayElement';
import Menu                from './components/Menu/Menu';
import Game                from './components/Zone/Game/Game';
import DashDafXF           from './dashboards/daf-xf/components/DashDafXF';
import DashDefault         from './dashboards/defaut/components/DashDefault';
import DashJAGFx           from './dashboards/jagfx/components/DashJAGFx';
import DashManTGX          from './dashboards/man-tgx/components/DashManTGX';
import DashMercedesAtego   from './dashboards/mercedes-atego/components/DashMercedesAtego';
import DashRdInfo          from './dashboards/rd-info/components/DashRdInfo';
import DashScania          from './dashboards/scania/components/DashScania';
import DashTest            from './dashboards/test/components/DashTest';
import DashVolvoFH         from './dashboards/volvo-fh/components/DashVolvoFH';


export default {
  name:       'app',
  components: {
    EventOverlayElement,
    DashJAGFx,
    DashTest,
    DashDefault,
    DashDafXF,
    DashManTGX,
    DashMercedesAtego,
    DashRdInfo,
    DashScania,
    DashVolvoFH,
    Game,
    Menu,
    OverlayElement
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
    this.$store.dispatch( 'skins/setFirstActive' );
    this.$store.dispatch( 'config/load' );

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
      currentSkin:     'skins/current'
    } )
  },
  sockets:  {
    connect() {
      console.log( 'connected', this.gameConnected );
      this.launching = {
        icon:    '<i class="fas fa-truck"></i>',
        text:    'Connected to telemetry server',
        subText: 'Ready to delivering'
      };
    },
    update( data ) {
      this.$updateTelemetry( { ...data } );
    },
    log( log ) {
      const event = _event.filterInputEvent( log );

      if ( event !== false ) {
        //console.log( log );
        this.$store.dispatch( 'events/emitEvent', {
          eventName: event.eventName,
          rawData:   event.rawData
        } );
      }
    }
  }
};
</script>

<style lang="scss">
@import "assets/scss/app/app";
</style>
