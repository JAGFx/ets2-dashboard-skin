<template>
  <div class="scania-bar flex-area flex-column w-75">
    <div class="d-flex justify-content-between align-items-center w-100">
      <slot />
      <div class="flex-area w-100 raw">
        <span class="value">{{ value.toFixed(1) }}</span>
        <span class="unit">{{ unit }}</span>
      </div>
    </div>
    <div class="flex-area w-100 squares">
      <div
        v-for="i in squaresCount"
        class="square"
        :class="{ active: squareIsActive(i) }"
      ></div>
    </div>
    <div class="line w-100"></div>
    <div class="d-flex justify-content-between align-items-center w-100 labels">
      <span>{{ min.toFixed(0) }}</span>
      <span v-if="displayMidLabel">{{
        Math.ceil((min + max) / 2).toFixed(0)
      }}</span>
      <span>{{ max.toFixed(0) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScaniaNextGenBar',
  props: {
    displayMidLabel: {
      type: Boolean,
      required: false,
      default: true
    },
    squaresCount: {
      type: Number,
      required: false,
      default: 10
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
    }
  },
  methods: {
    squareIsActive(number) {
      const valueBySquare = (this.max - this.min) / this.squaresCount;
      return this.value >= valueBySquare * number + this.min;
    }
  }
};
</script>
