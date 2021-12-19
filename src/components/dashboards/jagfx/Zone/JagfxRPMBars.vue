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
import jq from 'json-query';

export default {
  name: 'JagfxRPMBars',
  props: {
    brand: {
      type: Object,
      required: true
    },
    engine: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      ter: null,
      maxBarRpm: 25
    };
  },
  mounted() {
    if (this.brand !== undefined || this.model !== undefined) {
      const ter = JSON.parse(JSON.stringify(truck_engine_rpm));
      this.ter = jq(
        `trucks[brandId=${this.brand.id}].models[modelId=${this.model.id}]`,
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
    }
  },
  methods: {
    getRPMBarActive: function (i) {
      if (this.ter === undefined || this.ter === null) return false;

      const rpmBarFrom = this.getCurrentRpmBar(i);

      return this.engine.rpm.value >= rpmBarFrom && this.engine.rpm.value !== 0;
    },
    getCurrentRpmBar: function (i) {
      if (this.ter === null) return 0;

      const maxBar = this.maxBarRpm;
      const rpmByBar = this.engine.rpm.max / maxBar;
      const iLow = maxBar - i;

      return iLow * rpmByBar;
    },
    isAGreenBar: function (i) {
      if (this.ter === null) return false;

      const rpmBarFrom = this.getCurrentRpmBar(i);

      return (
        this.ter.low !== null &&
        rpmBarFrom >= this.ter.low.from &&
        rpmBarFrom <= this.ter.low.to
      );
    },
    isABlueBar: function (i) {
      if (this.ter === null) return false;

      const rpmBarFrom = this.getCurrentRpmBar(i);

      return (
        this.ter.mid !== null &&
        rpmBarFrom >= this.ter.mid.from &&
        rpmBarFrom <= this.ter.mid.to
      );
    },
    isARedBar: function (i) {
      if (this.ter === null) return false;

      const rpmBarFrom = this.getCurrentRpmBar(i);

      return this.ter.high !== null && rpmBarFrom >= this.ter.high.from;
    }
  }
};
</script>
