<template>
  <div class="bars">
    <div
      v-for="i in maxBarRpm"
      :key="i"
      :class="{
        active: getRPMBarActive(i),
        green: isAGreenBar(i),
        blue: isABlueBar(i),
        red: isARedBar(i)
      }"
      class="bar"
    />
  </div>
</template>

<script>
import truck_engine_rpm from '@/data/truck-engine-rpm.json';
import { store as telemetryStore } from '@/store/telemetry.store';
import gsap from 'gsap';
import jq from 'json-query';

export default {
  name: 'JagfxRPMBars',
  props: {
    brandId: {
      type: String,
      required: true
    },
    engineRpm: {
      type: Number,
      required: true
    },
    engineMaxRpm: {
      type: Number,
      required: true
    },
    modelId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ter: null,
      maxBarRpm: 25,
      last: 0,
      animationIsActive: false,
      valueOnIgnitionAnimation: 0
    };
  },
  computed: {
    ignitionIsOn: () => telemetryStore.model.truck.ignitionIsTurnedOn,
    rpmValue() {
      if (this.animationIsActive) return this.valueOnIgnitionAnimation;

      return this.ignitionIsOn ? this.engineRpm : 0;
    }
  },
  watch: {
    rpmValue(newValue, oldValue) {
      this.last = oldValue;
    },
    ignitionIsOn(value) {
      const animationDuration = 0.8;
      if (value) {
        this.animationIsActive = true;
        this.valueOnIgnitionAnimation = 0;

        gsap
          .to(this.$data, {
            duration: animationDuration,
            valueOnIgnitionAnimation: this.engineMaxRpm
          })
          .then(() => {
            return gsap.to(this.$data, {
              duration: animationDuration,
              valueOnIgnitionAnimation: 0
            });
          })
          .then(() => {
            return gsap.to(this.$data, {
              duration: animationDuration,
              valueOnIgnitionAnimation: this.rpmValue
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
            valueOnIgnitionAnimation: 0
          })
          .then(() => {
            this.animationIsActive = false;
          });
      }
    }
  },
  mounted() {
    const ter = JSON.parse(JSON.stringify(truck_engine_rpm));
    this.ter = jq(
      `trucks[brandId=${this.brandId.id}].models[modelId=${this.modelId.id}]`,
      { data: ter }
    ).value;

    if (this.ter === null) {
      this.ter = {
        max: 2500,
        low: null,
        mid: null,
        high: null
      };
    }
  },
  methods: {
    getRPMBarActive(i) {
      if (this.ter === undefined || this.ter === null) return false;

      const rpmBarFrom = this.getCurrentRpmBar(i);

      return this.rpmValue >= rpmBarFrom && this.rpmValue !== 0;
    },
    getCurrentRpmBar(i) {
      if (this.ter === null) return 0;

      const maxBar = this.maxBarRpm;
      const rpmByBar = this.engineMaxRpm / maxBar;
      const iLow = maxBar - i;

      return iLow * rpmByBar;
    },
    isAGreenBar(i) {
      if (this.ter === null) return false;

      const rpmBarFrom = this.getCurrentRpmBar(i);

      return (
        this.ter.low !== null &&
        rpmBarFrom >= this.ter.low.from &&
        rpmBarFrom <= this.ter.low.to
      );
    },
    isABlueBar(i) {
      if (this.ter === null) return false;

      const rpmBarFrom = this.getCurrentRpmBar(i);

      return (
        this.ter.mid !== null &&
        rpmBarFrom >= this.ter.mid.from &&
        rpmBarFrom <= this.ter.mid.to
      );
    },
    isARedBar(i) {
      if (this.ter === null) return false;

      const rpmBarFrom = this.getCurrentRpmBar(i);

      return this.ter.high !== null && rpmBarFrom >= this.ter.high.from;
    }
  }
};
</script>
