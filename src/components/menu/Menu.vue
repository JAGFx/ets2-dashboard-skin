<template>
  <div class="menu h-100">
    <nav>
      <ul>
        <li
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: currentTab === tab }"
          @click="onClickSwitchTab(tab)"
        >
          {{ $t(tab) }}
        </li>
      </ul>
    </nav>
    <component :is="currentTabComponent" class="tab-content h-100" />
  </div>
</template>

<script>
import MenuTabAbout from '@/components/menu/MenuTabAbout.vue';
import MenuTabConfig from '@/components/menu/MenuTabConfig.vue';
import MenuTabSkins from '@/components/menu/MenuTabSkins.vue';
import { HTY_LEVEL, HTY_ZONE } from '@/utils/_history';

export default {
  name: 'Menu',
  components: {
    MenuTabAbout,
    MenuTabConfig,
    MenuTabSkins
  },
  data() {
    return {
      currentTab: 'About',
      tabs: ['Skins', 'Config', 'About']
    };
  },
  computed: {
    currentTabComponent: function () {
      return 'MenuTab' + this.currentTab;
    }
  },
  methods: {
    onClickSwitchTab(tab) {
      this.$pushALog('Switch tab to ' + tab, HTY_ZONE.MENU, HTY_LEVEL.DEBUG);

      this.currentTab = tab;
    }
  }
};
</script>
