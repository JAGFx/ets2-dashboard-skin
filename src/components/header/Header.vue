<template>
  <div id="header">
    <HeaderGameInformation v-if="gameConnected" id="game" />
    <div v-if="gameConnected" v-show="menuIsDisplayed" class="wrapper menu h-100">
      <Menu />
    </div>
  </div>
</template>

<script>
import HeaderGameInformation from '@/components/header/HeaderGameInformation';
import Menu                  from '@/components/menu/Menu';
import { mapGetters }        from 'vuex';

export default {
  name:       'Header',
  components: { HeaderGameInformation, Menu },
  computed:   {
    ...mapGetters( {
      menuIsDisplayed: 'menu/isDisplayed'
    } )
  }
};
</script>
