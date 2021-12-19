<template>
  <div
    :class="classCSS"
    :style="{ transform: 'rotate(' + angle() + 'deg)' }"
    :data-type="type"
  />
</template>

<script>
export default {
  name: 'Cadran',
  props: {
    classCSS: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    minAngle: {
      type: Number,
      required: true
    },
    maxAngle: {
      type: Number,
      required: true
    }
  },
  methods: {
    angle() {
      const minValue = this.min;
      const maxValue = this.max;
      const minAngle = this.minAngle;
      const maxAngle = this.maxAngle;
      let value = this.value;
      value = Math.min(value, maxValue);
      value = Math.max(value, minValue);
      const offset = (value - minValue) / (maxValue - minValue);

      return (maxAngle - minAngle) * offset + minAngle;
    }
  }
};
</script>
