<template>
  <div class="scania-bar d-flex" :class="{ disabled }">
    <slot v-if="displayIcon" />
    <div
      class="d-flex justify-content-between align-items-start flex-column w-100"
    >
      <div class="line" :style="{ width: percentage() + '%' }" />
      <div class="squares d-flex">
        <div v-for="i in squareCount()" :key="i" class="square" />
      </div>
      <div
        class="labels d-flex justify-content-between align-items-center w-100"
      >
        <span class="start flex-area">{{ min }}</span>
        <span v-if="displayMidLabel" class="middle flex-area">{{
          Math.ceil((min + max) / 2)
        }}</span>
        <span class="end flex-area">{{ max }}</span>
      </div>
      <div
        v-if="displayValue && displayValuePosition === 'bottom'"
        class="raw d-flex justify-content-center align-items-center w-100"
      >
        <span class="value">{{ getValue() }}</span>
        <span class="unit">{{ unit }}</span>
      </div>
    </div>
    <div
      v-if="displayValue && displayValuePosition === 'right'"
      class="raw d-flex justify-content-center align-items-center mr-2"
    >
      <span class="value">{{ getValue() }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScaniaBar',
  props: {
    displayIcon: {
      type: Boolean,
      required: false,
      default: true
    },
    displayValue: {
      type: Boolean,
      required: false,
      default: true
    },
    displayValuePosition: {
      type: String,
      required: false,
      default: 'bottom'
    },
    displayMidLabel: {
      type: Boolean,
      required: false,
      default: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: false,
      default: '--'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    squareCount() {
      if (
        this.displayIcon &&
        this.displayValue &&
        this.displayValuePosition === 'right'
      ) {
        return 8;
      }

      return this.displayIcon ? 8 : 10;
    },
    percentage() {
      return (this.value * this.maxWidth()) / this.max;
    },
    maxWidth() {
      if (
        this.displayIcon &&
        this.displayValue &&
        this.displayValuePosition === 'right'
      ) {
        return 89.5;
      }

      return this.displayIcon ? 90.5 : 92.2;
    },
    getValue() {
      if (this.disabled) return '-';

      return this.value.toFixed(1);
    }
  }
};
</script>
