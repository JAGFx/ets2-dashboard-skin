<template>
  <tr>
    <td class="symbol-td">
      <div class="d-flex justify-content-center">
        <div class="symbol" :class="[color, { multiple: icons.length > 1 }]">
          <i v-for="icon in icons" :key="icon" class="icon" :class="icon" />
        </div>
      </div>
    </td>
    <td>
      <div class="d-flex flex-column">
        <div class="d-flex justify-content-start align-items-center">
          <span>{{ $t(label) }}</span>
          <span v-if="!implemented" class="badge badge-secondary ml-2">{{
            $t('Not yet implemented')
          }}</span>
        </div>
        <small v-if="description.length > 0" class="description">{{
          $t(description)
        }}</small>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'SkinManualLine',
  props: {
    icons: {
      type: Array,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    implemented: {
      type: Boolean,
      required: false,
      default: true
    }
  }
};
</script>
