<template>
  <div class="overlay">
    <b-overlay
      :show="isOnProcessing"
      :variant="message.type"
      no-wrap
    >
      <template #overlay>
        <div class="d-flex justify-content-center flex-column align-items-center">
          <h1>{{ $t(message.title) }}</h1>
          <small
            v-show="message.message !== null"
            class="mb-3"
          >{{ $t(message.message) }}</small>
          <b-spinner
            v-if="!hasError"
            :label="$t('Processing')"
            type="grow"
          />
          <button
            v-if="hasError"
            class="btn btn-sm btn-outline-ets"
            @click="close"
          >
            OK
          </button>
					
          <div
            v-if="hasError"
            class="details mt-3"
          >
            <div
              class="d-flex w-100 flex-column justify-content-center align-items-center"
              style="min-width:20rem"
            >
              <div @click="showDetails = !showDetails">
                <small class="text-center px-3">{{ $t(( !showDetails ) ? 'Show' : 'Hide') }} {{ $t('more details') }}</small>
                <i class="fas fa-caret-down" />
              </div>
							
              <div
                v-if="showDetails"
                class="d-flex flex-column justify-content-between"
              >
                <div class="h d-flex justify-content-between align-items-center mb-2">
                  <span>#{{ details.code }}</span>
                  <button
                    v-clipboard:copy="JSON.stringify( details, null, 2 )"
                    class="copy btn btn-sm btn-outline-ets d-flex justify-content-around align-items-center"
                  >
                    <i class="far fa-clipboard pr-1" />
                    {{ $t('Copy') }}
                  </button>
                </div>
                <pre class="w-100 p-2">{{ JSON.stringify( details, null, 2 ) }}</pre>
                <span>{{ $t('You can') }} <a
                  href="https://github.com/JAGFx/ets2-dashboard-skin/issues/new/choose"
                  target="_blank"
                >{{ $t('create an issue') }}</a> {{ $t('and/or contact me at') }} <a
                  href="mailto:hey@emmanuel-smith.me"
                  target="_blank"
                >hey@emmanuel-smith.me</a> {{ $t('with the above details') }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Overlay',
  data() {
    return {
      showDetails: false
    };
  },
  computed: {
    ...mapGetters( {
      isOnProcessing: 'app/isOnProcessing',
      message:        'app/message',
      details:        'app/details'
    } ),
    detailsMessage() {
      let message = this.details.message;

      if ( typeof this.details.message
           === 'object'
           && Object.prototype.hasOwnProperty.call( this.details.message, 'message' ) )
        message = this.details.message.message;

      return message;
    },
    hasError(){
      return this.details.code !== null;
    }
  },
  methods:    {
    close() {
      this.$store.dispatch( 'app/endProcessing' );
    }
  }
	};
</script>