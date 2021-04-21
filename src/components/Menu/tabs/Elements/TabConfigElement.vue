<template>
  <div class="field d-flex justify-content-between align-items-center" v-if="elm.disabled === undefined || ( elm.disabled !== undefined && !elm.disabled )">
    <div>
      <h5 class="m-0">{{ elm.label }}</h5>
      <small class="font-italic text-muted">{{ elm.description }}</small>
    </div>
    <div class="input d-flex justify-content-between align-items-stretch" v-if="values === null" :class="{ 'processing': appGetProcessing }">
      <div class="input-zone prefix"><i class="fas fa-globe"></i></div>
      <input :type="elm.type" class="form-control input-zone" v-model="val">
      <button class="input-zone valid" @click="set( val )"><i class="fas fa-check"></i></button>
    </div>
    <div class="switch d-flex justify-content-between align-items-stretch" v-else-if="values.length <= 2" :class="{ 'processing': appGetProcessing }">
      <div :class="{ 'active': current( elm.id ) === value.value }" :key="value.value" @click="set( value.value )" class="value w-100 m-0 text-center d-flex justify-content-center align-items-center" v-for="value in values">
        <span class="py-1 px-2">{{ value.label }}</span>
      </div>
    </div>
    <div class="select d-flex justify-content-between align-items-stretch" v-else-if="values.length > 2" :class="{ 'processing': appGetProcessing }">
      <select :disabled="appGetProcessing" :multiple="elm.multiple !== undefined && elm.multiple" v-model="val" @change="set( val )" class="custom-select value w-100 m-0 py-1 px-2">
        <option :key="value.value" :selected="current( elm.id ) === value.value" :value="value.value" v-for="value in values">
          {{ value.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import _              from 'lodash';
import { mapGetters } from 'vuex';

export default {
  name:  'TabConfigElement',
  props: [ 'elm' ],
  data() {
    const values = this.elm.values;

    return {
      val:    (values !== null && values.length > 0)
                  ? _.first( values ).value
                  : null,
      values: values
    };
  },
  mounted() {
    this.val = this.current( this.elm.id );

    if ( this.elm.hasOwnProperty( 'asyncValues' ) && this.elm.asyncValues ) {
      //console.log( 'asyncValues !', this.elm );

      //switch ( this.elm.id ) {
      //
      //}
    }
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
@import "../../../../assets/scss/menu/_tab-config/input";
</style>
