<template>
  <div class="menu h-100">
    <nav>
      <ul>
        <li
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="{ active: currentTab === tab }"
            v-on:click="onClickSwitchTab( tab )"
        >{{ tab }}
        </li>
      </ul>
    </nav>
    <component v-bind:is="currentTabComponent" class="tab-content h-100"></component>
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
  methods:    {
    onClickSwitchTab( tab ) {
      this.$pushALog( 'Switch tab to ' + tab, history.HTY_ZONE.MENU, history.HTY_LEVEL.DEBUG );

      this.currentTab = tab;
    }
  },
  computed:   {
    currentTabComponent: function () {
      return 'MenuTab' + this.currentTab;
    }
  }
};
</script>