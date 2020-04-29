<template>
	<main class="waiting" v-if="!game || !game.sdkActive">
		<h1>
			<span class="animated flipInX infinite">Waiting on connection...</span>
		</h1>
	</main>
	<main :class="`${game && game.game.id == 2 ? 'ats' : 'ets2'}`" v-else>
		<Game @onOpenSettingView="onOpenSettingView()" id="game" v-bind="{...game}" />
		<div class="wrapper" v-show="menuDisplayed">
			<Menu></Menu>
		</div>
		<DashJAGFx v-show="!menuDisplayed"></DashJAGFx>
		<!--<Events id="events" v-bind="{log}" />-->
		<!--<Controls id="controls" v-bind="{...controls, transmission: truck.transmission}" />-->
	</main>
</template>

<script>
	import Menu      from './components/Menu/Menu';
	import Game      from './components/Zone/Game/Game';
	import DashJAGFx from './dashboards/jagfx/DashJAGFx';
	
	import * as utils from './utils/utils';
	
	export default {
		name:       'app',
		components: {
			DashJAGFx,
			Game,
			Menu
		},
		
		data: function () {
			//console.log( utils.app );
			
			const tData = utils.app.initTelemetryData( [ 'game' ] );
			return Object.assign( {}, tData, {
				menuDisplayed: false
			} );
		},
		
		methods: {
			onOpenSettingView() {
				console.log( 'Received' );
				this.menuDisplayed = !this.menuDisplayed;
			}
		},
		sockets: {
			connect: function () {
				//console.log("connected")
			},
			update:  function ( data ) {
				let srvData = {};
				
				for ( const key of Object.keys( data ) ) {
					srvData[ key ] = data[ key ];
				}
				
				const filteredData = utils.app.updateTelemetryData( data, [ 'game' ] );
				filteredData.map( elm => this[ elm ] );
				
				//console.log( this );
				
				// TODO Continue here: Send updated data to child component
				this.$emit( 'update-data', srvData );
			},
			log:     function ( log ) {
				log.reverse();
				this.log = log;
			}
		}
	};
</script>

<style lang="scss">
	@import "assets/scss/app/app";
</style>
