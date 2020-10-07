<template>
	<div class="field d-flex justify-content-between align-items-center" v-if="elm.disabled === undefined || ( elm.disabled !== undefined && !elm.disabled )">
    <div>
      <h5 class="m-0">{{ elm.label }}</h5>
      <small class="font-italic text-muted">{{ elm.description }}</small>
    </div>
    <div class="switch d-flex justify-content-between align-items-stretch" v-if="elm.values.length <= 2" :class="{ 'processing': appGetProcessing }">
      <div :class="{ 'active': current( elm.id ) === value.value }" :key="value.value" @click="set( value.value )" class="value w-100 m-0 text-center d-flex justify-content-center align-items-center" v-for="value in elm.values">
        <span class="py-1 px-2">{{ value.label }}</span>
      </div>
    </div>
    <div class="select d-flex justify-content-between align-items-stretch" v-else-if="elm.values.length > 2" :class="{ 'processing': appGetProcessing }">
      <select :disabled="appGetProcessing" :multiple="elm.multiple !== undefined && elm.multiple" @change="set( current( elm.id ) )" class="custom-select value w-100 m-0 py-1 px-2">
        <option :key="value.value" :selected="current( elm.id ) === value.value" :value="value.value" v-for="value in elm.values">
          {{ value.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex';
	
	export default {
		name:     'TabConfigElement',
		props:    [ 'elm' ],
		data() {
			return {};
		},
		computed: {
			...mapGetters( {
        current:          'config/get',
        appGetProcessing: 'app/getProcessing'
      } )
		},
		methods:  {
			set( value ) {
        this.$store.commit( 'config/setElm', {
          id:    this.elm.id,
          value: value
        } );
      }
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../../assets/scss/menu/_tab-config/switch";
	@import "../../../../assets/scss/menu/_tab-config/select";
</style>
