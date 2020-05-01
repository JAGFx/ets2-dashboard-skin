<script>/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	skinsMixins.vue
 * Date: 	30/04/2020
 * Time: 	17:57
 */

import skins from '../../utils/_skins';

export default {
	data() {
		return {
			skins: skins.all
		};
	},
	methods: {
		$isActive( skin ) {
			const currentSkin = this.$store.state.currentSkin;
			
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
			this.$store.commit( 'updateSkin', skin );
			//this.$root.$emit( 'skin-update-active', skin );
		}
	}
};
</script>
