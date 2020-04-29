<template>
	<Dashboard v-slot:default="dashProps">
		<div class="zone-wrapper">
			<div class="left">
				<Trailer id="trailers" v-bind="{...dashProps.trailer, cargo: dashProps.job.cargo}" />
				<Job id="job" v-bind="{...dashProps.job, game: dashProps.game.game, distance: dashProps.navigation.distance}" />
			</div>
		</div>
		<Navigation id="navigation" v-bind="{...dashProps.navigation, ...dashProps.truck, gameTime: dashProps.game.time.unix}" />
		<div class="zone-wrapper">
			<Truck id="truck" v-bind="{...dashProps.truck}" />
		</div>
	</Dashboard>
</template>

<script>
	import Dashboard  from '../../components/Elements/Dashboard';
	import Job        from './Zone/Job/Job';
	import Trailer    from './Zone/Job/Trailer';
	import Navigation from './Zone/Navigation/Navigation';
	import Truck      from './Zone/Truck/Truck';
	
	export default {
		name:       'DashJAGFx',
		components: {
			Dashboard,
			Navigation,
			Job,
			Truck,
			Trailer
		},
		data() {
			return {
				maxSideElements:   7,
				maxMiddleElements: 4
			};
		},
		methods:    {
			$elementIsEnabled: function ( side, element, options ) {
				let enabledElements = [];
				const config        = this.$dashSlot().configSettings;
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
				const config        = this.$dashSlot().configSettings;
				
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
			$dashSlot() {
				return this.$children[ 0 ];
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
