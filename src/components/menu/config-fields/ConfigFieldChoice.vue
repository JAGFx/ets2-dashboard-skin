<template>
  <ConfigField
    v-bind="{
      label,
      description
    }"
  >
    <div
      v-if="vals.length <= 2"
      class="switch d-flex justify-content-between align-items-stretch"
      :class="{ 'processing': appGetProcessing }"
    >
      <div
        v-for="value in vals"
        :key="value.value"
        :class="{ 'active': current( id ) === value.value }"
        class="value w-100 m-0 text-center d-flex justify-content-center align-items-center"
        @click="set( value.value )"
      >
        <span class="py-1 px-2">{{ value.label }}</span>
      </div>
    </div>
    <div
      v-else-if="vals.length > 2"
      class="select d-flex justify-content-between align-items-stretch"
      :class="{ 'processing': appGetProcessing }"
    >
      <select
        v-model="val"
        :disabled="appGetProcessing"
        :multiple="multiple !== undefined && multiple"
        class="custom-select value w-100 m-0 py-1 px-2"
        @change="set( val )"
      >
        <option
          v-for="value in vals"
          :key="value.value"
          :selected="current( id ) === value.value"
          :value="value.value"
        >
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