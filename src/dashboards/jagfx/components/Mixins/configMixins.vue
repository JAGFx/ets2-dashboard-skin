<script>
	/**
	 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
	 * project:	ets2-dashboard-skin
	 * file: 	configMixins.js
	 * Date: 	30/04/2020
	 * Time: 	13:12
	 */
	
	import * as utils from '../../../../utils/utils';
	
	export default {
		data() {
			return {
				configSettings:    {},
				maxSideElements:   7,
				maxMiddleElements: 4
			};
		},
		created() {
			let that = this;
			//console.log( 'plop' );
			utils.config.configPath()
				 .then( config => {
					 //console.log( 'Data', config );
					 that.configSettings = config;
				 } );
			
		},
		methods: {
			$configSettings() {
				return utils.config.configSettings( this.configSettings );
			},
			$maxSideElements() {
				return this.maxSideElements;
			},
			$maxMiddleElements() {
				return this.maxMiddleElements;
			},
			$elementIsEnabled: function ( side, element, options ) {
				let enabledElements = [];
				const config        = this.$configSettings();
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
				const config        = this.$configSettings();
				
				if ( side === 'right' )
					enabledElements = config.right;
				
				if ( side === 'middle' )
					enabledElements = config.middle;
				
				if ( side === 'middle' && enabledElements !== undefined )
					enabledElements = enabledElements.top;
				
				return (enabledElements === undefined)
					? 0
					: enabledElements.length;
			}
		}
	};
</script>
