<template>
	<main :class="`${telemetry.game && telemetry.game.game.id === 2 ? 'ats' : 'ets2'}`">
		<b-overlay :show="!gameConnected" :variant="'dark'" no-wrap>
			<template v-slot:overlay>
				<div class="d-flex justify-content-center flex-column align-items-center">
					<transition mode="out-in" name="slide-fade">
						<div :key="launching.text" class="d-flex justify-content-center align-items-center flex-column">
							<h1><span class="mr-3" v-html="launching.icon"></span>{{ launching.text }}</h1>
							<small>{{ launching.subText }}</small>
							<b-spinner label="Processing..." type="grow"></b-spinner>
						</div>
					</transition>
				</div>
			</template>
		</b-overlay>
		
		<OverlayElement v-if="gameConnected"></OverlayElement>
		<Game id="game" v-if="gameConnected" />
		<div class="wrapper menu h-100" v-if="gameConnected" v-show="menuIsDisplayed()">
			<Menu></Menu>
		</div>
		<component v-bind:is="currentSkinComponent()" v-if="gameConnected" v-show="!menuIsDisplayed()"></component>
		<!--<Events id="events" v-bind="{log}" />-->
		<!--<Controls id="controls" v-bind="{...controls, transmission: truck.transmission}" />-->
	</main>
</template>

<script>
	import { mapGetters }    from 'vuex';
	import OverlayElement    from './components/Elements/OverlayElement';
	import Menu              from './components/Menu/Menu';
	import AppDashMixins     from './components/Mixins/AppDashMixins';
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
			Menu,
			OverlayElement
		},
		
		mixins: [ AppDashMixins ],
		
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
			//console.log( this );
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
		computed: {
			gameConnected() {
				return this.telemetry.game && this.telemetry.game.sdkActive;
			}
		},
		sockets:  {
			connect: function () {
				//console.log( 'connected' );
				this.launching = {
					icon:    '<i class="fas fa-truck"></i>',
					text:    'Connected to telemetry server',
					subText: 'Arrived on delivery site'
				};
			},
			update:  function ( data ) {
				let srvData = {};
				
				for ( const key of Object.keys( data ) ) {
					srvData[ key ] = data[ key ];
				}
				
				this.$store.commit( 'telemetry/update', srvData );
			},
			log:     function ( log ) {
				/*log.reverse();
				 this.log = log;*/
			}
		}
	};
</script>

<style lang="scss">
	@import "assets/scss/app/app";
</style>
