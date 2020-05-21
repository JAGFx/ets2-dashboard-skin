<template>
	<nav class="game">
		<ul>
			<li><span>Game</span>{{game.name.toUpperCase()}}</li>
			<li><span>API</span>v{{telemetryVersion}}</li>
			<!--<li><span>Uptime</span>{{formatedTimestamp()}}</li>-->
		</ul>
		<div class="game-time">
			<span>{{$formatDate(time.unix)}}</span>
		</div>
		<ul>
			<li @click="onClickGear()">
				<span v-show="!menuIsDisplayed()">Menu <i class="fas fa-bars"></i>️</span>
				<span v-show="menuIsDisplayed()">Close <i class="fas fa-times"></i>️</span>
			</li>
			<li>JAGFx - {{ getVersion() }}<span>&copy;</span></li>
		</ul>
		
		<!--<div><span>Game:</span><span>{{game.name.toUpperCase()}}</span></div>
		<div><span>Telemetry version:</span><span>{{telemetryVersion}}</span></div>
		&lt;!&ndash;<div><span>Paused:</span><span>{{paused ? "YES" : "NO"}}</span></div>&ndash;&gt;
		<div><span>Uptime:</span><span>{{formatedTimestamp()}}</span></div>
		<div><span>Game time:</span><span>{{formatedTime()}}</span></div>-->
	</nav>
</template>

<script>
	import { mapGetters } from 'vuex';
	import * as utils     from '../../../utils/utils';
	import dashMixins     from '../../Mixins/dashMixins';
	
	export default {
		name:   'Game',
		props:  [
			'timestamp',
			'time',
			'game',
			'paused',
			'sdkActive',
			'pluginVersion',
			'version',
			'telemetryVersion',
			'maxTrailerCount',
			'scale'
		],
		mixins: [ dashMixins ],
		
		methods: {
			double: function ( num ) {
				return num < 10 ? `0${ num }` : num;
			},
			getVersion() {
				return utils.app.version;
			},
			onClickGear() {
				this.$store.dispatch( 'menu/toggle' );
			},
			...mapGetters( {
				menuIsDisplayed: 'menu/isDisplayed'
			} )
		}
	};
</script>

<style scoped lang="scss">
	@import "../../../assets/scss/game/game";
</style>
