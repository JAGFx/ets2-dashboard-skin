<template>
	<nav class="game">
		<ul>
			<li><span>Game</span>{{game.name.toUpperCase()}}</li>
			<li><span>API</span>v{{telemetryVersion}}</li>
			<!--<li><span>Uptime</span>{{formatedTimestamp()}}</li>-->
		</ul>
		<div  class="game-time">
            <span>{{formatedTime()}}</span>
        </div>
		<ul>
			<li><span>&copy;</span>JAGFx - {{ getVersion() }}</li>
		</ul>
		
		<!--<div><span>Game:</span><span>{{game.name.toUpperCase()}}</span></div>
		<div><span>Telemetry version:</span><span>{{telemetryVersion}}</span></div>
		&lt;!&ndash;<div><span>Paused:</span><span>{{paused ? "YES" : "NO"}}</span></div>&ndash;&gt;
		<div><span>Uptime:</span><span>{{formatedTimestamp()}}</span></div>
		<div><span>Game time:</span><span>{{formatedTime()}}</span></div>-->
	</nav>
</template>

<script>
	import utilsApp from '../../../utils/_app';
	
	export default {
		name: 'Game',
		mixins: [ utilsApp ],
		props: [
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
		
		methods: {
			double:            function ( num ) {
				return num < 10 ? `0${ num }` : num;
			},
			formatedTimestamp: function () {
				const hours = Math.floor( this.timestamp.value / 3600000 );
				const min   = Math.floor( this.timestamp.value % 3600000 / 60000 );
				const sec   = Math.floor( this.timestamp.value % 3600000 % 60000 / 1000 );
				
				return `${ this.double( hours ) }:${ this.double( min ) }:${ this.double( sec ) }`;
			},
			formatedTime:      function () {
				const date = new Date( this.time.unix );
				
				const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
				
				return `${ days[ date.getUTCDay() ] } ${ this.double( date.getUTCHours() ) }:${ this.double( date.getUTCMinutes() ) }`;
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../../assets/scss/game/game";
</style>
