<template>
	<div id="waiting" v-if="!game || !game.sdkActive">
		<h1>Waiting on connection...</h1>
	</div>
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
	import Controls    from '@/components/Controls.vue';
	import Events      from '@/components/Events.vue';
	import Game        from '@/components/Game.vue';
	import Job         from '@/components/Job.vue';
	import Navigation  from '@/components/Navigation.vue';
	import Trailer     from '@/components/Trailer.vue';
	import Truck       from '@/components/Truck.vue';
	import Window      from '@/components/Window.vue';
	import testData    from './data/scs_sdk_plugin_parsed_data.json';
	import countryList from 'country-list';
	import emojiFlags  from 'emoji-flags';
	
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
		
		data:    function () {
			if ( process.env.VUE_APP_USE_FAKE_DATA )
				return testData;
			
			return {
				game:       null,
				controls:   null,
				navigation: null,
				job:        null,
				truck:      null,
				trailers:   [],
				log:        []
			};
		},
		methods: {
			setSelected: function ( selected ) {
				this.selected = selected;
			},
			getFlag:     function ( countryName ) {
				const countryCode = countryList.getCode( countryName );
				const flag        = emojiFlags.countryCode( countryCode );
				
				//console.log( countryName, countryCode, flag, flag.emoji );
				
				return (flag !== undefined)
					? flag.emoji
					: '🏳️';
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
	@import "./scss/variables";
	@import "./scss/licencePlate";
	@import "./scss/damage";
	
	@font-face {
		font-family: 'roboto';
		src: url('assets/Roboto-Regular.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
	}
	
	@font-face {
		font-family: 'roboto';
		src: url('assets/Roboto-Regular.ttf') format('truetype');
		font-weight: 100;
		font-style: normal;
	}
	
	@font-face {
		font-family: 'suprrpg';
		src: url('assets/SUPRRG__.TTF') format('truetype');
		font-weight: 100;
		font-style: normal;
	}
	
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
	
	#waiting {
		background-color: var(--color-red);
		display: grid;
		justify-items: center;
		align-items: center;
	}
	
	main {
		width: 100%;
		height: 100%;
		background: #121212;
	}


</style>
