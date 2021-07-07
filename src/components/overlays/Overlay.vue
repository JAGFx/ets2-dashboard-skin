<template>
	<div class="overlay">
		<b-overlay :show="isOnProcessing" :variant="message.type" no-wrap>
			<template v-slot:overlay>
				<div class="d-flex justify-content-center flex-column align-items-center">
					<h1>{{ message.title }}</h1>
					<small class="mb-3" v-show="message.message !== null">{{ message.message }}</small>
					<b-spinner label="Processing..." type="grow" v-if="!hasError"></b-spinner>
					<button @click="close" class="btn btn-sm btn-outline-ets" v-if="hasError">OK</button>
					
					<div class="details mt-3" v-if="hasError">
						<div class="d-flex w-100 flex-column justify-content-center align-items-center" style="min-width:20rem">
							<div @click="showDetails = !showDetails">
								<small class="text-center px-3">{{ ( !showDetails ) ? 'Show' : 'Hide' }} more details</small>
								<i class="fas fa-caret-down"></i>
							</div>
							
							<div class="d-flex flex-column justify-content-between" v-if="showDetails">
								<div class="h d-flex justify-content-between align-items-center mb-2">
									<span>#{{ details.code }}</span>
									<button class="copy btn btn-sm btn-outline-ets d-flex justify-content-around align-items-center" v-clipboard:copy="JSON.stringify( details, null, 2 )">
										<i class="far fa-clipboard pr-1"></i>
										Copy
									</button>
								</div>
								<pre class="w-100 p-2">{{ JSON.stringify( details, null, 2 ) }}</pre>
								<span>You can <a href="https://github.com/JAGFx/ets2-dashboard-skin/issues/new/choose" target="_blank">create an issue</a> and/or contact me at <a href="mailto:hey@emmanuel-smith.me" target="_blank">hey@emmanuel-smith.me</a> with the above details</span>
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
  methods:    {
    close() {
      this.$store.dispatch( 'app/endProcessing' );
    }
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
		}
	};
</script>