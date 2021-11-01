<template>
  <b-overlay
    :show="display"
    :variant="'dark'"
    no-wrap
  >
    <template #overlay>
      <div class="d-flex justify-content-center flex-column align-items-center">
        <transition
          mode="out-in"
          name="slide-fade"
        >
          <div
            :key="launching.text"
            class="d-flex justify-content-center align-items-center flex-column"
          >
            <h1>
              <span
                class="mb-3"
                v-html="launching.icon"
              />
            </h1>
            <h1 class="text-center">
              {{ $t(launching.text) }}
            </h1>
            <small class="mb-3">{{ $t(launching.subText) }}</small>
            <!--            <b-spinner-->
            <!--              :label="$t('Processing')"-->
            <!--              type="grow"-->
            <!--            />-->
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
  props: {
    display: {
      type:Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters( {
      launching: 'app/launch'
    } )
  }
};
</script>