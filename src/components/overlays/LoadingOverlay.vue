<template>
  <b-overlay :show="!gameConnected" :variant="'dark'" no-wrap>
    <template v-slot:overlay>
      <div class="d-flex justify-content-center flex-column align-items-center">
        <transition mode="out-in" name="slide-fade">
          <div :key="launching.text" class="d-flex justify-content-center align-items-center flex-column">
            <h1><span class="mb-3" v-html="launching.icon"></span></h1>
            <h1 class="text-center">{{ launching.text }}</h1>
            <small class="mb-3">{{ launching.subText }}</small>
            <b-spinner label="Processing..." type="grow"></b-spinner>
          </div>
        </transition>
      </div>
    </template>
  </b-overlay>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name:     'LoadingOverlay',
  computed: {
    ...mapGetters( {
      launching: 'app/launch'
    } )
  }
};
</script>