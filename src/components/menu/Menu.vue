<template>
  <div class="menu h-100">
    <nav>
      <ul>
        <li
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: currentTab === tab }"
          @click="onClickSwitchTab( tab )"
        >
          {{ tab }}
        </li>
      </ul>
    </nav>
    <component
      :is="currentTabComponent"
      class="tab-content h-100"
    />
  </div>
</template>

<script>
import MenuTabAbout  from '@/components/menu/MenuTabAbout';
import MenuTabConfig from '@/components/menu/MenuTabConfig';
import MenuTabSkins  from '@/components/menu/MenuTabSkins';
import { history }   from '@/utils/utils';

export default {
  name:       'Menu',
  components: {
    MenuTabAbout,
    MenuTabConfig,
    MenuTabSkins
  },
  data() {
    return {
      currentTab: 'About',
      tabs:       [ 'Skins', 'Config', 'About' ]
    };
  },
  computed:   {
    currentTabComponent: function () {
      return 'MenuTab' + this.currentTab;
    }
  },
  methods:    {
    onClickSwitchTab( tab ) {
      this.$pushALog( 'Switch tab to ' + tab, history.HTY_ZONE.MENU, history.HTY_LEVEL.DEBUG );

      this.currentTab = tab;
    }
  }
};
</script>