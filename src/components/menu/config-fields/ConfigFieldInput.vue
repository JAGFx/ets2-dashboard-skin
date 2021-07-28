<template>
  <ConfigField v-bind="{
        label,
        description
      }">
    <div class="input d-flex justify-content-between align-items-stretch" v-if="vals.length === 0" :class="{ 'processing': appGetProcessing }">
      <div class="input-zone prefix"><i class="fas fa-globe"></i></div>
      <input :type="type" class="form-control input-zone" v-model="val">
      <button class="input-zone valid" @click="set( val )"><i class="fas fa-check"></i></button>
    </div>
  </ConfigField>
</template>

<script>
import ConfigField      from '@/components/menu/config-fields/ConfigField';
import ConfigFieldMixin from '@/mixins/ConfigFieldMixin';

export default {
  name:       'ConfigFieldInput',
  components: { ConfigField },
  props:      {
    type: {
      type:     String,
      required: false,
      default:  'text'
    }
  },
  mixins:     [ ConfigFieldMixin ]
};
</script>