<template>
  <div id="header">
    <HeaderGameInformation
      v-if="appReady"
      id="game"
    />
    <div
      v-if="appReady"
      v-show="menuIsDisplayed"
      class="wrapper menu h-100"
    >
      <Menu />
    </div>
  </div>
</template>

<script>
import HeaderGameInformation from '@/components/header/HeaderGameInformation';
import Menu                  from '@/components/menu/Menu';
import TelemetryMixin        from '@/mixins/TelemetryMixin';
import { mapGetters }        from 'vuex';

export default {
  name:       'Header',
  components: { HeaderGameInformation, Menu },
  mixins: [TelemetryMixin  ],
  computed:   {
    ...mapGetters( {
      menuIsDisplayed: 'menu/isDisplayed'
    } )
  }
};
</script>
