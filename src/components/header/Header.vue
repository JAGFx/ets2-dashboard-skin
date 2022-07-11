<template>
  <div id="header">
    <HeaderGameInformation v-if="$telemetryDataIsEnough" id="game" />
    <div
      v-if="$telemetryDataIsEnough"
      v-show="menuIsDisplayed"
      class="wrapper menu h-100"
    >
      <Menu />
    </div>
  </div>
</template>

<script>
import HeaderGameInformation from '@/components/header/HeaderGameInformation.vue';
import Menu from '@/components/menu/Menu.vue';
import TelemetryMixin from '@/mixins/TelemetryMixin.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  components: { HeaderGameInformation, Menu },
  mixins: [TelemetryMixin],
  computed: {
    ...mapGetters({
      menuIsDisplayed: 'menu/isDisplayed'
    })
  }
};
</script>
