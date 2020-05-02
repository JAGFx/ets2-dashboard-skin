<script>
	/**
	 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
	 * project:	ets2-dashboard-skin
	 * file: 	skinsMixins.vue
	 * Date: 	30/04/2020
	 * Time: 	17:57
	 */
	
	export default {
		methods: {
			$isActive( skin ) {
				const currentSkin = this.$store.getters[ 'skins/current' ];
				
				if ( currentSkin === undefined || currentSkin === null )
					return false;
				
				return skin.id === currentSkin.id;
			},
			$isDisabled( skin ) {
				if ( skin === undefined || skin === null )
					return false;
				
				return skin.disabled;
			},
			$setActive( skin ) {
				//console.log( 'Update', skin );
				this.$store.commit( 'skins/setCurrent', skin );
				//this.$root.$emit( 'skin-update-active', skin );
			},
			$skins() {
				return this.$store.getters[ 'skins/all' ];
			}
		}
	};
</script>
