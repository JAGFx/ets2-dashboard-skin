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
      let value = this.value;
      value = Math.min(value, this.max);
      value = Math.max(value, this.min);
      const offset = (value - this.min) / (this.max - this.min);

      return (this.maxAngle - this.minAngle) * offset + this.minAngle;
    }
  }
};
</script>
