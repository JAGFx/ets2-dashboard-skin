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
import _history  from '@/utils/_history';
import TabAbout  from './tabs/TabAbout';
import TabConfig from './tabs/TabConfig';
import TabSkins  from './tabs/TabSkins';

export default {
  name:       'Menu',
  components: {
    TabSkins,
    TabConfig,
    TabAbout
  },
  data() {
    return {
      currentTab: 'About',
      tabs:       [ 'Skins', 'Config', 'About' ]
    };
  },
  methods:    {
    onClickSwitchTab( tab ) {
      this.$pushALog( 'Switch tab to ' + tab, _history.HTY_ZONE.MENU, _history.HTY_LEVEL.DEBUG );

      this.currentTab = tab;
    }
  },
  computed:   {
    currentTabComponent: function () {
      return 'Tab' + this.currentTab;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/menu/menu';
</style>
