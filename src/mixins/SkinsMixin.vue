<script>
/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	skinsMixins.vue
 * Date: 	30/04/2020
 * Time: 	17:57
 */

import _history       from '@/utils/_history';
import { mapGetters } from 'vuex';

export default {
  methods:  {
    $isActive( skin ) {
      const currentSkin = this.currentSkin;

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
      this.$pushALog( 'Set skin active ' + JSON.stringify( skin ), _history.HTY_ZONE.MENU_SKIN );

      this.$store.commit( 'skins/setCurrent', skin );
      this.$store.dispatch( 'menu/toggle' );
    },
    $skins() {
      return this.allSkin;
    }
  },
  computed: {
    ...mapGetters( {
      currentSkin: 'skins/current',
      allSkin:     'skins/all'
    } )
  }
};
</script>
