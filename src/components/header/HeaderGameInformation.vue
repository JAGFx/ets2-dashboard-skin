<template>
  <nav class="header-game-information-overlay">
    <ul class="w-100">
      <!--      <li><span>Game</span>{{ telemetry.game.game.name.toUpperCase() }}</li>-->
      <li>
        <span>{{ $t('API') }}</span
        >v{{ telemetry.game.telemetryVersion }}
      </li>
      <li v-if="!isOnDevEnvironment() && !newReleaseAvailable">
        <span>&copy;</span>JAGFx - {{ getVersion() }}
      </li>
      <li
        v-else-if="!isOnDevEnvironment() && newReleaseAvailable"
        class="new-release"
      >
        <span class="d-flex justify-content-center align-items-center">
          <a
            href="https://github.com/JAGFx/ets2-dashboard-skin/releases/latest"
            target="_blank"
          >
            {{ $t('Get new !') }} <i class="ml-1 fas fa-cloud-download-alt" />
          </a>
        </span>
      </li>
      <li v-else>
        <select v-model="event" class="w-100" @change="onEventChange">
          <option disabled selected value="">
            {{ $t('Select one') }}
          </option>
          <optgroup :label="$t('Game')">
            <!--						<option value="game.connected">Connected</option>-->
            <!--						<option value="game.disconnected">Disconnected</option>-->
            <option value="game.pause">
              {{ $t('Pause / Unpause') }}
            </option>
            <option value="game.fine">
              {{ $t('Fine') }}
            </option>
            <option value="game.tollgate">
              {{ $t('Toll gate') }}
            </option>
            <option value="game.ferry">
              {{ $t('Ferry') }}
            </option>
            <option value="game.train">
              {{ $t('Train') }}
            </option>
            <option value="game.refuel-payed">
              {{ $t('Refuel played') }}
            </option>
          </optgroup>
          <optgroup :label="$t('Job')">
            <option value="job.cancelled">
              {{ $t('Cancelled') }}
            </option>
            <option value="job.delivered">
              {{ $t('Delivered') }}
            </option>
            <option value="job.finished">
              {{ $t('Finished') }}
            </option>
            <option value="job.started">
              {{ $t('Started') }}
            </option>
          </optgroup>
          <optgroup :label="$t('Navigation')">
            <option value="navigation.speed-limit">
              {{ $t('Speed limit change') }}
            </option>
          </optgroup>
          <optgroup :label="$t('Trailers')">
            <option value="trailers.coupling">
              {{ $t('Coupling') }}
            </option>
            <option value="trailers.damage">
              {{ $t('Damage') }}
            </option>
          </optgroup>
          <optgroup :label="$t('Truck')">
            <option value="truck.cruise-control">
              {{ $t('Cruise control ON / OFF') }}
            </option>
            <option value="truck.cruise-control-increase">
              {{ $t('Cruise control increase') }}
            </option>
            <option value="truck.cruise-control-decrease">
              {{ $t('Cruise control decrease') }}
            </option>
            <option value="truck.warning">
              {{ $t('Warning') }}
            </option>
            <option value="truck.emergency">
              {{ $t('Emergency') }}
            </option>
            <option value="truck.electric">
              {{ $t('Électrique') }}
            </option>
            <option value="truck.engine">
              {{ $t('Engine') }}
            </option>
            <option value="truck.park">
              {{ $t('Park') }}
            </option>
            <option value="truck.damage">
              {{ $t('Damage') }}
            </option>
            <option value="truck.refuel">
              {{ $t('Refuel') }}
            </option>
          </optgroup>
        </select>
      </li>
      <!--<li><span>Uptime</span>{{formatedTimestamp()}}</li>-->
    </ul>
    <div class="game-time">
      <span>{{
        $dateTimeLocalized(
          telemetry2.gameTime,
          DATE_FORMAT_LONG,
          TIME_FORMAT_SHORT
        )
      }}</span>
    </div>
    <ul class="w-100">
      <li @click="onClickGear()">
        <span v-show="!menuIsDisplayed"
          >{{ $t('Menu') }} <i class="fas fa-bars" />️</span
        >
        <span v-show="menuIsDisplayed"
          >{{ $t('Close') }} <i class="fas fa-times" />️</span
        >
      </li>
      <li @click="onClickFullscreen()">
        <span v-show="!fullscreen"><i class="fas fa-expand" /></span>
        <span v-show="fullscreen"><i class="fas fa-compress" /></span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { isOnDevEnvironment, version } from "@/utils/_app";
import { HTY_LEVEL, HTY_ZONE }         from "@/utils/_history";
import scsSDKData                      from 'ets2-dashboard-lib/sdk/scs_sdk_plugin_parsed_data.json';
import TelemetryMixin                  from '@/mixins/TelemetryMixin';
import * as axios                      from 'axios';
import { mapGetters }                  from 'vuex';

export default {
  name: 'HeaderGameInformation',
  mixins: [TelemetryMixin],
  data() {
    return {
      event: '',
      fullscreen: false,
      wakeLock: null,
      newReleaseAvailable: false
    };
  },
  computed: {
    ...mapGetters({
      menuIsDisplayed: 'menu/isDisplayed'
    })
  },
  mounted() {
    axios
      .get(
        'https://api.github.com/repos/JAGFx/ets2-dashboard-skin/releases/latest'
      )
      .then((data) => {
        const latestReleaseVersion = data.data.tag_name;
        const appVersion = `v${version}`;

        if (latestReleaseVersion !== appVersion)
          this.newReleaseAvailable = true;
      });
  },
  methods: {
    getVersion() {
      return version;
    },
    isOnDevEnvironment() {
      return isOnDevEnvironment;
    },
    onEventChange() {
      const spitedEvent = this.event.split('.');
      let rawData = scsSDKData.events[spitedEvent[0]][spitedEvent[1]];

      this.$pushALog(
        'Throw event ' + this.event,
        HTY_ZONE.ZONE_GAME,
        HTY_LEVEL.DEBUG
      );

      this.$updateEvent({
        eventName: this.event,
        rawData: { ...rawData }
      });
    },
    onClickGear() {
      this.$pushALog(
        'Menu toggle',
        HTY_ZONE.ZONE_GAME,
        HTY_LEVEL.DEBUG
      );

      this.$store.dispatch('menu/toggle');
    },
    onClickFullscreen() {
      const elem = document.querySelector('html');

      if (!this.fullscreen) {
        // Enable fullscreen

        if (elem.requestFullscreen) elem.requestFullscreen();
        else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
        else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen) elem.msRequestFullscreen();

        this.$pushALog(
          'Enable fullscreen',
          HTY_ZONE.ZONE_GAME,
          HTY_LEVEL.DEBUG
        );
      } else {
        // Disable fullscreen

        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();

        this.$pushALog(
          'Disable fullscreen',
          HTY_ZONE.ZONE_GAME,
          HTY_LEVEL.DEBUG
        );
      }

      this.switchAwakeScreen();

      this.fullscreen = !this.fullscreen;
    },
    switchAwakeScreen() {
      this.$pushALog(
        'Wake Lock API support: ' + ('wakeLock' in navigator),
        HTY_ZONE.ZONE_GAME,
        HTY_LEVEL.DEBUG
      );
      this.$pushALog(
        'Screen Keep awake support: ' + ('keepAwake' in screen),
        HTY_ZONE.ZONE_GAME,
        HTY_LEVEL.DEBUG
      );

      if ('wakeLock' in navigator) this.useWakeLock();
      else if ('keepAwake' in screen) this.useScreenAwake();
      else this.useVueInsomnia();
    },
    useVueInsomnia() {
      this.$pushALog(
        'Awake screen - Use VueInsomnia',
        HTY_ZONE.ZONE_GAME,
        HTY_LEVEL.DEBUG
      );

      if (!this.fullscreen) this.vueInsomnia().on();
      else this.vueInsomnia().off();
    },
    useWakeLock() {
      this.$pushALog(
        'Awake screen - Use WakeLock API',
        HTY_ZONE.ZONE_GAME,
        HTY_LEVEL.DEBUG
      );

      if (!this.fullscreen)
        navigator.wakeLock.request('screen').then((wakeLock) => {
          this.wakeLock = wakeLock;
        });
      else this.wakeLock.release();
    },
    useScreenAwake() {
      this.$pushALog(
        'Awake screen - Use Screen Awake API',
        HTY_ZONE.ZONE_GAME,
        HTY_LEVEL.DEBUG
      );
      screen.keepAwake = this.fullscreen;
    }
  }
};
</script>
