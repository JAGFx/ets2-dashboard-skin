<template>
  <div
    :class="classCSS"
    :style="{ transform: `rotate(${angle}deg)` }"
    :data-type="type"
  />
</template>

<script>
import { store as telemetryStore } from '@/store/telemetry.store';
import gsap from 'gsap';

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
  data() {
    return {
      animationIsActive: false,
      last: this.min,
      valueOnIgnitionAnimation: 0
    };
  },
  computed: {
    ignitionIsOn: () => telemetryStore.model.truck.ignitionIsTurnedOn,
    angle() {
      let value = this.angleRawValue;
      value = Math.min(value, this.max);
      value = Math.max(value, this.min);
      const offset = (value - this.min) / (this.max - this.min);

      return (this.maxAngle - this.minAngle) * offset + this.minAngle;
    },
    angleRawValue() {
      if (this.animationIsActive) return this.valueOnIgnitionAnimation;

      return this.ignitionIsOn ? this.value : this.min;
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.last = oldValue;
    },
    ignitionIsOn(value) {
      const animationDuration = 0.8;
      if (value) {
        this.animationIsActive = true;
        this.valueOnIgnitionAnimation = this.min;

        gsap
          .to(this.$data, {
            duration: animationDuration,
            valueOnIgnitionAnimation: this.max
          })
          .then(() => {
            return gsap.to(this.$data, {
              duration: animationDuration,
              valueOnIgnitionAnimation: this.min
            });
          })
          .then(() => {
            return gsap.to(this.$data, {
              duration: animationDuration,
              valueOnIgnitionAnimation: this.value
            });
          })
          .then(() => {
            this.animationIsActive = false;
          });
      } else {
        this.animationIsActive = true;
        this.valueOnIgnitionAnimation = this.last;

        gsap
          .to(this.$data, {
            duration: animationDuration,
            valueOnIgnitionAnimation: this.min
          })
          .then(() => {
            this.animationIsActive = false;
          });
      }
    }
  }
};
</script>
