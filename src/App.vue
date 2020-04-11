<template>
	<main class="waiting" v-if="!game || !game.sdkActive">
		<h1>
			<span class="animated flipInX infinite">Waiting on connection...</span>
		</h1>
	</main>
	<main :class="`${game && game.game.id == 2 ? 'ats' : 'ets2'}`" v-else>
		<Game id="game" v-bind="{...game}" />
		<div class="wrapper">
			<div class="left">
				<Trailer id="trailers" v-bind="{...trailer, cargo: job.cargo}" />
				<Job id="job" v-bind="{...job, game: game.game, distance: navigation.distance}" />
			</div>
			<Navigation id="navigation" v-bind="{...navigation, ...truck, gameTime: game.time.unix}" />
			<Truck id="truck" v-bind="{...truck}" />
		</div>
		<!--<Events id="events" v-bind="{log}" />-->
		<!--<Controls id="controls" v-bind="{...controls, transmission: truck.transmission}" />-->
	</main>
</template>

<script>
	import Controls   from '@/components/Controls.vue';
	import Events     from '@/components/Events.vue';
	import Game       from '@/components/Game.vue';
	import Job        from '@/components/Job.vue';
	import Navigation from '@/components/Navigation.vue';
	import Trailer    from '@/components/Trailer.vue';
	import Truck      from '@/components/Truck.vue';
	import Window     from '@/components/Window.vue';
	
	import testData    from './data/scs_sdk_plugin_parsed_data.json';
	import utilsConfig from './utils/_config';
	
	export default {
		name: 'app',
		
		components: {
			Window,
			Game,
			Controls,
			Navigation,
			Job,
			Truck,
			Trailer,
			Events
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
				configSettings:  {},
				maxSideElements: 7
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
			$elementIsEnabled: function ( side, element ) {
				let enabledElements = [];
				const config        = JSON.parse( JSON.stringify( this.configSettings ) );
				
				if ( side === 'right' )
					enabledElements = config.right;
				
				//console.log( config, this.configSettings);
				if ( enabledElements === undefined )
					return false;
				
				const indexElement = enabledElements.indexOf( element );
				//console.log( indexElement, this.maxSideElements );
				if ( side === 'left' || side === 'right' ) {
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
				
				return (enabledElements === undefined)
					? 0
					: enabledElements.length;
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
	@import "assets/scss/common/variables";
	@import "assets/scss/common/font-face";
	
	@import "assets/scss/common/licencePlate";
	@import "assets/scss/common/damage";
	@import "assets/scss/common/dash-element";
	
	@import "assets/scss/app/app";
	
	* {
		margin: 0;
		padding: 0;
	}
	
	.capitalized {
		text-transform: capitalize;
	}
	
	.text-center {
		text-align: center;
	}
	
	.hidden {
		visibility: hidden;
	}
	
	html {
		display: flex;
		height: 100vh;
		width: 100vw;
		font-family: roboto;
	}
	
	body,
	#app,
	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden;
		/*height: calc(100% - var(--spacing) * 2);*/
	}
	
	body {
		background-color: var(--color-black);
		color: var(--color-text);
		word-wrap: break-word;
	}
	
	#app {
		background: #000;
		background-size: cover;
		font-family: 'Inconsolata', monospace;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.wrapper {
		display: flex;
		height: 100%;
		
		> * {
			width: 100%;
		}
	}
	
	.left {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	main {
		width: 100%;
		height: 100%;
		background: #121212;
	}


</style>
