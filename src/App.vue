<template>
	<main class="waiting" v-if="!game || !game.sdkActive">
		<h1>
			<span class="animated flipInX infinite">Waiting on connection...</span>
		</h1>
	</main>
	<main :class="`${game && game.game.id == 2 ? 'ats' : 'ets2'}`" v-else>
		<Game @onOpenSettingView="onOpenSettingView()" id="game" v-bind="{...game}" />
		<div class="wrapper" v-if="menuDisplayed">
			<Menu></Menu>
		</div>
		<div :class="truck.brand.id" class="wrapper" v-else>
			<div class="zone-wrapper">
				<div class="left">
					<Trailer id="trailers" v-bind="{...trailer, cargo: job.cargo}" />
					<Job id="job" v-bind="{...job, game: game.game, distance: navigation.distance}" />
				</div>
			</div>
			<Navigation id="navigation" v-bind="{...navigation, ...truck, gameTime: game.time.unix}" />
			<div class="zone-wrapper">
				<Truck id="truck" v-bind="{...truck}" />
			</div>
		</div>
		<!--<Events id="events" v-bind="{log}" />-->
		<!--<Controls id="controls" v-bind="{...controls, transmission: truck.transmission}" />-->
	</main>
</template>

<script>
	import Menu       from './components/Menu/Menu';
	import Game       from './components/Zone/Game/Game';
	import Job        from './components/Zone/Job/Job';
	import Trailer    from './components/Zone/Job/Trailer';
	import Navigation from './components/Zone/Navigation/Navigation';
	import Truck      from './components/Zone/Truck/Truck';
	
	import testData    from './data/scs_sdk_plugin_parsed_data.json';
	import utilsConfig from './utils/_config';
	
	export default {
		name:       'app',
		components: {
			Game,
			Navigation,
			Job,
			Truck,
			Trailer,
			Menu
		},
		
		mixins: [ utilsConfig ],
		
		data:    function () {
			let data;
			
			if ( process.env.VUE_APP_USE_FAKE_DATA === 'true' )
				data = testData;
			
			else
				data = {
					game:       null,
					controls:   null,
					navigation: null,
					job:        null,
					truck:      null,
					trailers:   [],
					log:        []
				};
			
			return Object.assign( {}, data, {
				configSettings:    {},
				maxSideElements:   7,
				maxMiddleElements: 4,
				menuDisplayed:     true
			} );
		},
		created() {
			let that = this;
			this.config_getConfigData()
				.then( config => {
					//console.log( 'Data', config );
					that.configSettings = config;
				} );
		},
		methods: {
			$elementIsEnabled: function ( side, element, options ) {
				let enabledElements = [];
				const config        = JSON.parse( JSON.stringify( this.configSettings ) );
				
				//console.log( config );
				
				if ( side === 'right' )
					enabledElements = config.right;
				
				if ( side === 'middle-t' || side === 'middle-b' )
					enabledElements = config.middle;
				
				//console.log( config, this.configSettings);
				if ( enabledElements === undefined )
					return false;
				
				if ( side === 'middle-t' )
					enabledElements = enabledElements.top;
				
				if ( side === 'middle-b' )
					enabledElements = enabledElements.bottom;
				
				const indexElement = enabledElements.indexOf( element );
				//console.log( indexElement, this.maxSideElements );
				
				if ( side === 'middle-t' ) {
					if ( options === undefined )
						return false;
					
					const navElmSide = options.side;
					//console.log( side, navElmSide, indexElement, (this.maxMiddleElements / 2) );
					
					if ( indexElement + 1 > ((this.maxMiddleElements / 2)) && navElmSide === 'left' )
						return false;
					
					if ( navElmSide === 'right' ) {
						if ( ((indexElement + 1) <= ((this.maxMiddleElements / 2))) || ((indexElement + 1)
																						> this.maxMiddleElements) )
							return false;
						
					}
				}
				
				if ( side === 'right' ) {
					if ( indexElement > this.maxSideElements - 1 )
						return false;
				}
				
				return indexElement !== -1;
			},
			$elementsLength:   function ( side ) {
				let enabledElements = [];
				const config        = JSON.parse( JSON.stringify( this.configSettings ) );
				
				if ( side === 'right' )
					enabledElements = config.right;
				
				if ( side === 'middle' )
					enabledElements = config.middle;
				
				if ( side === 'middle' && enabledElements !== undefined )
					enabledElements = enabledElements.top;
				
				return (enabledElements === undefined)
					? 0
					: enabledElements.length;
			},
			onOpenSettingView() {
				console.log( 'Received' );
				this.menuDisplayed = true;
			}
		},
		sockets: {
			connect: function () {
				//console.log("connected")
			},
			update:  function ( data ) {
				for ( const key of Object.keys( data ) ) {
					this[ key ] = data[ key ];
				}
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
