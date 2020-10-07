<template>
	<nav class="game">
		<ul>
			<li><span>Game</span>{{telemetry.game.game.name.toUpperCase()}}</li>
			<li><span>API</span>v{{telemetry.game.telemetryVersion}}</li>
			<!--<li><span>Uptime</span>{{formatedTimestamp()}}</li>-->
		</ul>
		<div class="game-time">
			<span>{{ $gameTime() | $dateTimeLocalized( DATE_FORMAT_LONG, TIME_FORMAT_FULL ) }}</span>
		</div>
		<ul>
      <li @click="onClickGear()">
        <span v-show="!menuIsDisplayed">Menu <i class="fas fa-bars"></i>️</span>
        <span v-show="menuIsDisplayed">Close <i class="fas fa-times"></i>️</span>
      </li>
      <li v-if="!isOnDevEnvironment()">JAGFx - {{ getVersion() }}<span>&copy;</span></li>
      <li v-else>
        <select @change="onEventChange" v-model="event">
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
		</ul>
		
		<!--<div><span>Game:</span><span>{{telemetry.game.name.toUpperCase()}}</span></div>
		<div><span>Telemetry version:</span><span>{{telemetryVersion}}</span></div>
		&lt;!&ndash;<div><span>Paused:</span><span>{{paused ? "YES" : "NO"}}</span></div>&ndash;&gt;
		<div><span>Uptime:</span><span>{{formatedTimestamp()}}</span></div>
		<div><span>Game time:</span><span>{{formatedTime()}}</span></div>-->
	</nav>
</template>

<script>
	import { mapGetters } from 'vuex';
	import scsSDKData     from '../../../data/scs_sdk_plugin_parsed_data.json';
	import * as utils     from '../../../utils/utils';
	import AppDashMixins  from '../../Mixins/AppDashMixins';
	
	export default {
		name:    'Game',
		mixins:  [ AppDashMixins ],
		data() {
			return {
				event: ''
			};
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

        this.$store.dispatch( 'events/emitEvent', {
          eventName: this.event,
          rawData:   rawData
        } );
      },
      onClickGear() {
        this.$store.dispatch( 'menu/toggle' );
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
	@import "../../../assets/scss/game/game";
</style>
