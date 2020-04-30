<script>
	/**
	 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
	 * project:	ets2-dashboard-skin
	 * file: 	skinsMixins.vue
	 * Date: 	30/04/2020
	 * Time: 	17:57
	 */
	
	import _     from 'lodash';
	import skins from '../../data/skins.json';
	
	export default {
		data() {
			return {
				skins:   skins.skins,
				current: _.head( skins.skins )
			};
		},
		methods: {
			$isActive( skin ) {
				return skin.id === this.current.id;
			}
		}
	};
</script>
