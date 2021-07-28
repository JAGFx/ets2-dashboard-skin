<template>
  <ConfigField
    v-bind="{
      label,
      description
    }"
  >
    <div
      v-if="vals.length === 0"
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
      >
      <button
        class="input-zone valid"
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
  }
};
</script>