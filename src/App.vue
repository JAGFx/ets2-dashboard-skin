<template>
	<main class="waiting" v-if="!game || !game.sdkActive">
		<h1>
			<span class="animated flipInX infinite">Waiting on connection...</span>
		</h1>
	</main>
	<main :class="`${game && game.game.id === 2 ? 'ats' : 'ets2'}`" v-else>
		<Game id="game" />
		<div class="wrapper menu" v-show="menuIsDisplayed()">
			<Menu></Menu>
		</div>
		<component v-bind:is="currentSkinComponent()" v-show="!menuIsDisplayed()"></component>
		<!--<Events id="events" v-bind="{log}" />-->
		<!--<Controls id="controls" v-bind="{...controls, transmission: truck.transmission}" />-->
	</main>
</template>

<script>
	import { mapGetters }    from 'vuex';
	import Menu              from './components/Menu/Menu';
	import dashMixins        from './components/Mixins/dashMixins';
	import Game              from './components/Zone/Game/Game';
	import DashDafXF         from './dashboards/daf-xf/components/DashDafXF';
	import DashDefault       from './dashboards/defaut/components/DashDefault';
	import DashJAGFx         from './dashboards/jagfx/components/DashJAGFx';
	import DashManTGX        from './dashboards/man-tgx/components/DashManTGX';
	import DashMercedesAtego from './dashboards/mercedes-atego/components/DashMercedesAtego';
	import DashRdInfo        from './dashboards/rd-info/components/DashRdInfo';
	import DashScania        from './dashboards/scania/components/DashScania';
	import DashTest          from './dashboards/test/components/DashTest';
	import DashVolvoFH       from './dashboards/volvo-fh/components/DashVolvoFH';
	
	
	export default {
		name:       'app',
		components: {
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
			Menu
		},
		
		mixins: [ dashMixins ],
		
		created() {
			//console.log( this );
			this.$store.dispatch( 'skins/setFirstActive' );
		},
		
		methods: {
			currentSkinComponent() {
				//console.log( this.currentSkin );
				const currentSkin = this.$store.getters[ 'skins/current' ];
				
				if ( currentSkin === undefined || currentSkin === null )
					return null;
				
				return 'Dash' + currentSkin.id;
			},
			/*telemetryData() {
			 return this.pickData()( DATA_ELEMENTS.game );
			 },*/
			...mapGetters( {
				//pickData:        'telemetry/pick',
				menuIsDisplayed: 'menu/isDisplayed'
			} )
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
				
				this.$store.commit( 'telemetry/update', srvData );
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
