<template>
  <ConfigField
    v-bind="{
      label,
      description
    }"
  >
    <div
      class="input d-flex justify-content-between align-items-stretch"
      :class="{ 'processing': appGetProcessing }"
    >
      <div class="input-zone prefix">
        <i class="fas fa-globe" />
      </div>
      <input
        v-model="val"
        :type="type"
        class="form-control input-zone"
        :disabled="disabled"
        v-bind="listProp"
      >
      <datalist
        v-if="vals.length > 0"
        :id="id + '_' + 'data-list'"
      >
        <option
          v-for="value in vals"
          :key="value.value"
          :selected="current( id ) === value.value"
          :value="value.value"
        />
      </datalist>
      <button
        class="input-zone valid"
        :disabled="disabled"
        @click="set( val )"
      >
        <i class="fas fa-check" />
      </button>
    </div>
  </ConfigField>
</template>

<script>
import ConfigField      from '@/components/menu/config-fields/ConfigField';
import ConfigFieldMixin from '@/mixins/ConfigFieldMixin';

export default {
  name:       'ConfigFieldInput',
  components: { ConfigField },
  mixins:     [ ConfigFieldMixin ],
  props:      {
    type: {
      type:     String,
      required: false,
      default:  'text'
    }
  },
  computed:   {
    listProp() {
      return (this.vals.length > 0)
          ? { list: this.id + '_' + 'data-list' }
          : {};
    }
  }
};
</script>