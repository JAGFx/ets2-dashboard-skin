import { store as telemetryStore } from '@/store/telemetry.store';

export default (Vue) => {
  new Vue({
    data() {
      return {
        truckElectricOnTimer: null
      };
    },
    computed: {
      raw: () => telemetryStore.telemetry
    },
    watch: {
      'raw.truck.electric.enabled': function (newValue) {
        if (newValue && !telemetryStore.model.truck.engineIsStarted) {
          telemetryStore.telemetry.truck.electric.start = true;

          this.truckElectricOnTimer = setTimeout(() => {
            telemetryStore.telemetry.truck.electric.start = false;
          }, 1000);
        } else {
          telemetryStore.telemetry.truck.electric.start = false;
          this.truckElectricOnTimer = null;
        }
      }
    }
  });
};
