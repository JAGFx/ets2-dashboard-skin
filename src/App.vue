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
		<component v-bind:is="currentSkinComponent()" v-show="!menuDisplayed"></component>
		<!--<Events id="events" v-bind="{log}" />-->
		<!--<Controls id="controls" v-bind="{...controls, transmission: truck.transmission}" />-->
	</main>
</template>

<script>
	import Menu      from './components/Menu/Menu';
	import Game      from './components/Zone/Game/Game';
	import DashTest  from './dashboards/test/components/DashTest';
	import DashJAGFx from './dashboards/jagfx/components/DashJAGFx';
	
	import _          from 'lodash';
	import * as utils from './utils/utils';
	
	export default {
		name:       'app',
		components: {
			DashJAGFx,
			DashTest,
			Game,
			Menu
		},
		
		data: function () {
			//console.log( utils.app );
			
			const tData = utils.app.initTelemetryData( [ 'game' ] );
			return Object.assign( {}, tData, {
				menuDisplayed: false,
				currentSkin:   null
			} );
		},
		
		created() {
			const firstSkin = _.head( utils.skins.actives );
			this.$store.commit( 'updateSkin', firstSkin );
		},
		
		methods: {
			onOpenSettingView() {
				console.log( 'Received' );
				this.menuDisplayed = !this.menuDisplayed;
			},
			currentSkinComponent() {
				//console.log( this.currentSkin );
				const currentSkin = this.$store.state.currentSkin;
				
				if ( currentSkin === undefined || currentSkin === null )
					return null;
				
				return 'Dash' + currentSkin.id;
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
