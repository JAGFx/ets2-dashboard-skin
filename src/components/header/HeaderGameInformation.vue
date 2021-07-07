<template>
  <nav class="game">
    <ul class="w-100">
      <!--      <li><span>Game</span>{{ telemetry.game.game.name.toUpperCase() }}</li>-->
      <li><span>API</span>v{{ telemetry.game.telemetryVersion }}</li>
      <li v-if="!isOnDevEnvironment() && !newReleaseAvailable"><span>&copy;</span>JAGFx - {{ getVersion() }}</li>
      <li v-else-if="!isOnDevEnvironment() && newReleaseAvailable" class="new-release">
        <span class="d-flex justify-content-center align-items-center">
          <a href="https://github.com/JAGFx/ets2-dashboard-skin/releases/latest" target="_blank">
            Get new ! <i class="ml-1 fas fa-cloud-download-alt"></i>
          </a>
        </span>
      </li>
      <li v-else>
        <select v-model="event" class="w-100" @change="onEventChange">
          <option disabled selected value="">Select one</option>
          <optgroup label="Game">
            <!--						<option value="game.connected">Connected</option>-->
            <!--						<option value="game.disconnected">Disconnected</option>-->
            <option value="game.pause">Pause / Unpause</option>
            <option value="game.fine">Fine</option>
            <option value="game.tollgate">Toll gate</option>
            <option value="game.ferry">Ferry</option>
            <option value="game.train">Train</option>
            <option value="game.refuel-payed">Refuel played</option>
          </optgroup>
          <optgroup label="Job">
            <option value="job.cancelled">Cancelled</option>
            <option value="job.delivered">Delivered</option>
            <option value="job.finished">Finished</option>
            <option value="job.started">Started</option>
          </optgroup>
          <optgroup label="Navigation">
            <option value="navigation.speed-limit">Speed limit change</option>
          </optgroup>
          <optgroup label="Trailers">
            <option value="trailers.coupling">Coupling</option>
            <option value="trailers.damage">Damage</option>
          </optgroup>
          <optgroup label="Truck">
            <option value="truck.cruise-control">Cruise control ON / OFF</option>
            <option value="truck.cruise-control-increase">Cruise control increase</option>
            <option value="truck.cruise-control-decrease">Cruise control decrease</option>
            <option value="truck.warning">Warning</option>
            <option value="truck.emergency">Emergency</option>
            <option value="truck.electric">Electric</option>
            <option value="truck.engine">Engine</option>
            <option value="truck.park">Park</option>
            <option value="truck.damage">Damage</option>
            <option value="truck.refuel">Refuel</option>
          </optgroup>
        </select>
      </li>
      <!--<li><span>Uptime</span>{{formatedTimestamp()}}</li>-->
    </ul>
    <div class="game-time">
      <span>{{ $gameTime() | $dateTimeLocalized( DATE_FORMAT_LONG, TIME_FORMAT_SHORT ) }}</span>
    </div>
    <ul class="w-100">
      <li @click="onClickGear()">
        <span v-show="!menuIsDisplayed">Menu <i class="fas fa-bars"></i>️</span>
        <span v-show="menuIsDisplayed">Close <i class="fas fa-times"></i>️</span>
      </li>
      <li @click="onClickFullscreen()">
        <span v-show="!fullscreen"><i class="fas fa-expand"></i></span>
        <span v-show="fullscreen"><i class="fas fa-compress"></i></span>
      </li>
    </ul>
  </nav>
</template>

<script>
import scsSDKData     from '@/data/scs_sdk_plugin_parsed_data.json';
import _history       from '@/utils/_history';
import * as utils     from '@/utils/utils';
import * as axios     from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderGameInformation',
  data() {
    return {
      event:               '',
      fullscreen:          false,
      wakeLock:            null,
      newReleaseAvailable: false
    };
  },
  created() {
    axios.get( 'https://api.github.com/repos/JAGFx/ets2-dashboard-skin/releases/latest' )
         .then( ( data ) => {
           const latestReleaseVersion = data.data.tag_name;
           const appVersion           = `v${ utils.app.version }`;

           if ( latestReleaseVersion !== appVersion )
             this.newReleaseAvailable = true;
         } );
  },
  methods: {
    getVersion() {
      return utils.app.version;
    },
    isOnDevEnvironment() {
      return utils.app.isOnDevEnvironment;
    },
    onEventChange() {
      const spitedEvent = this.event.split( '.' );
      let rawData       = scsSDKData.events[ spitedEvent[ 0 ] ][ spitedEvent[ 1 ] ];

      this.$pushALog( 'Throw event ' + this.event, _history.HTY_ZONE.ZONE_GAME, _history.HTY_LEVEL.DEBUG );

      this.$updateEvent( {
        eventName: this.event,
        rawData:   { ...rawData }
      } );
    },
    onClickGear() {
      this.$pushALog( 'Menu toggle', _history.HTY_ZONE.ZONE_GAME, _history.HTY_LEVEL.DEBUG );

      this.$store.dispatch( 'menu/toggle' );
    },
    onClickFullscreen() {
      const elem = document.querySelector( 'html' );

      if ( !this.fullscreen ) {
        // Enable fullscreen

        if ( elem.requestFullscreen )
          elem.requestFullscreen();

        else if ( elem.mozRequestFullScreen )
          elem.mozRequestFullScreen();

        else if ( elem.webkitRequestFullscreen )
          elem.webkitRequestFullscreen();

        else if ( elem.msRequestFullscreen )
          elem.msRequestFullscreen();

        this.$pushALog( 'Enable fullscreen', _history.HTY_ZONE.ZONE_GAME, _history.HTY_LEVEL.DEBUG );

      } else {
        // Disable fullscreen

        if ( document.exitFullscreen )
          document.exitFullscreen();

        else if ( document.mozCancelFullScreen )
          document.mozCancelFullScreen();

        else if ( document.webkitExitFullscreen )
          document.webkitExitFullscreen();

        else if ( document.msExitFullscreen )
          document.msExitFullscreen();

        this.$pushALog( 'Disable fullscreen', _history.HTY_ZONE.ZONE_GAME, _history.HTY_LEVEL.DEBUG );
      }

      this.switchAwakeScreen();

      this.fullscreen = !this.fullscreen;
    },
    switchAwakeScreen() {
      this.$pushALog( 'Wake Lock API support: ' + ('wakeLock' in navigator),
          _history.HTY_ZONE.ZONE_GAME,
          _history.HTY_LEVEL.DEBUG );
      this.$pushALog( 'Screen Keep awake support: ' + ('keepAwake' in screen),
          _history.HTY_ZONE.ZONE_GAME,
          _history.HTY_LEVEL.DEBUG );

      if ( 'wakeLock' in navigator )
        this.useWakeLock();
      else if ( 'keepAwake' in screen )
        this.useScreenAwake();
      else
        this.useVueInsomnia();
    },
    useVueInsomnia() {
      this.$pushALog( 'Awake screen - Use VueInsomnia', _history.HTY_ZONE.ZONE_GAME, _history.HTY_LEVEL.DEBUG );

      if ( !this.fullscreen )
        this.vueInsomnia().on();
      else
        this.vueInsomnia().off();
    },
    useWakeLock() {
      this.$pushALog( 'Awake screen - Use WakeLock API', _history.HTY_ZONE.ZONE_GAME, _history.HTY_LEVEL.DEBUG );

      if ( !this.fullscreen )
        navigator.wakeLock.request( 'screen' )
                 .then( ( wakeLock ) => {
                   this.wakeLock = wakeLock;
                 } );
      else
        this.wakeLock.release();
    },
    useScreenAwake() {
      this.$pushALog( 'Awake screen - Use Screen Awake API', _history.HTY_ZONE.ZONE_GAME, _history.HTY_LEVEL.DEBUG );
      screen.keepAwake = this.fullscreen;
    }
  },
  computed: {
    ...mapGetters( {
      menuIsDisplayed: 'menu/isDisplayed'
    } )
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/game/game";
</style>
