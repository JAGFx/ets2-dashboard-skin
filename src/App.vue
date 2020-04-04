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
	import Controls   from '@/components/Controls.vue';
	import Events     from '@/components/Events.vue';
	import Game       from '@/components/Game.vue';
	import Job        from '@/components/Job.vue';
	import Navigation from '@/components/Navigation.vue';
	import Trailer    from '@/components/Trailer.vue';
	import Truck      from '@/components/Truck.vue';
	import Window     from '@/components/Window.vue';
	
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
		}/*,
		mounted() {
			let js = document.createElement('script');
			js.setAttribute( 'src', 'node_modules/nosleep.js/dist/NoSleep.min.js' );
			document.head.appendChild(js);
		}*/
	};
</script>

<style lang="scss">
	:root {
		--spacing: 1rem;
		--color-bg: #121212;
		--color-window: rgba(0, 0, 0, 0.5);
		--color-border: rgba(60, 63, 65, 0.2);
		--color-text: #FFF;
		--color-highlight: rgba(114, 224, 209);
		--color-white: #EAEAEA;
		--color-black: #000;
		--color-red: #E00000;
		--color-green: #00E070;
		--color-yellow: #E0E000;
		--color-blue: #0CB4FF;
	}
	
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
	
	.capitalized{
		text-transform: capitalize;
	}
	
	.text-center{
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
	
	/*#app.ats {
	  background: url(assets/ats.jpg) no-repeat center center fixed;
	}*/
	
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
		/*display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-template-rows: 20px repeat(3, minmax(0, 1fr));
		margin: calc(var(--spacing) * 2);
		grid-gap: calc(var(--spacing) * 2);*/
	}
	
	main > h1 {
		/*grid-column: 1 / 4*/
	}
	
	#truck,
	#trailers {
		/*grid-row: span 2; */
	}
	
	#wheels {
		/*display: grid;
		grid-template-columns: repeat(auto-fill, 50px);
		grid-gap: 20px;*/
	}
	
	.list,
	.list > div {
		display: grid;
	}
	
	.list {
		grid-gap: var(--spacing);
	}
	
	.list > div {
		/*grid-template-columns: repeat(2, minmax(0, 1fr));*/
	}
</style>
