<template>
  <ConfigField v-bind="{
        label,
        description
      }">
    <div class="switch d-flex justify-content-between align-items-stretch" v-if="vals.length <= 2" :class="{ 'processing': appGetProcessing }">
      <div :class="{ 'active': current( id ) === value.value }" :key="value.value" @click="set( value.value )" class="value w-100 m-0 text-center d-flex justify-content-center align-items-center" v-for="value in vals">
        <span class="py-1 px-2">{{ value.label }}</span>
      </div>
    </div>
    <div class="select d-flex justify-content-between align-items-stretch" v-else-if="vals.length > 2" :class="{ 'processing': appGetProcessing }">
      <select :disabled="appGetProcessing" :multiple="multiple !== undefined && multiple" v-model="val" @change="set( val )" class="custom-select value w-100 m-0 py-1 px-2">
        <option :key="value.value" :selected="current( id ) === value.value" :value="value.value" v-for="value in vals">
          {{ value.label }}
        </option>
      </select>
    </div>
  </ConfigField>
</template>

<script>
import ConfigField      from '@/components/menu/config-fields/ConfigField';
import ConfigFieldMixin from '@/mixins/ConfigFieldMixin';

export default {
  name:       'ConfigFieldChoice',
  components: { ConfigField },
  mixins:     [ ConfigFieldMixin ],
  props:      {
    multiple: {
      type:    Boolean,
      default: false
    }
  }
};
</script>