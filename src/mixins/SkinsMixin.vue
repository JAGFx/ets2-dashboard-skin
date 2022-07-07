<script>
/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	skinsMixins.vue
 * Date: 	30/04/2020
 * Time: 	17:57
 */

import { HTY_ZONE }   from "@/utils/_history";
import { mapGetters } from 'vuex';

export default {
  name: 'SkinsMixin',
  computed: {
    ...mapGetters({
      currentSkin: 'skins/current',
      allSkin: 'skins/all',
      active: 'skins/active'
    })
  },
  methods: {
    $isActive(skin) {
      const currentSkin = this.currentSkin;

      if (currentSkin === undefined || currentSkin === null) return false;

      return skin.id === currentSkin.id;
    },
    $isDisabled(skin) {
      if (skin === undefined || skin === null) return false;

      return skin.disabled;
    },
    $hasManual(skin) {
      if (skin === undefined || skin === null) return false;

      return skin.manual === true;
    },
    $setActive(skin) {
      this.$pushALog(
        'Set skin active ' + JSON.stringify(skin),
        HTY_ZONE.MENU_SKIN
      );

      this.$store.commit('skins/setCurrent', skin);
      this.$store.dispatch('menu/toggle');
    },
    $skins() {
      return this.allSkin;
    },
    $actives() {
      return this.active;
    }
  }
};
</script>
