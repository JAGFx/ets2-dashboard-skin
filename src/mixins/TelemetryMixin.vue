<script>
import { store as telemetryStore } from '@/store/telemetry.store';
import { formatConstants } from '@/utils/_app';
import * as telemetryCommon from '@/utils/telemetry/_common.utils';
import * as telemetryGear from '@/utils/telemetry/_grear.utils';
import * as telemetryHelper from '@/utils/telemetry/_helper.utils';
import * as telemetryJob from '@/utils/telemetry/_job.utils';
import * as telemetryNavigation from '@/utils/telemetry/_navigation.utils';
import * as telemetryTrailer from '@/utils/telemetry/_trailer.utils';
import * as telemetryTruck from '@/utils/telemetry/_truck.utils';
import * as telemetryUnitConverter from '@/utils/telemetry/_unit-converter.utils';

export default {
  name: 'TelemetryMixin',
  filters: {
    $dateTimeLocalized: (time, dFormat, tFormat) => {
      return app.dateTimeLocalized(time, dFormat, tFormat);
    },
    $toFixed: (value, decimal) => {
      return value.toFixed(decimal);
    }
  },
  data() {
    return {
      truckElectricOnValue: false,
      truckElectricOnTimer: null
    };
  },
  computed: {
    telemetry: () => telemetryStore.telemetry,
    receivedData: () => telemetryStore.receivedData,
    truckElectricOn() {
      return this.truckElectricOnValue;
    },
    haveWarnings() {
      return (
          (this.telemetry.truck.brakes.airPressure.warning.enabled ||
           this.telemetry.truck.fuel.warning.enabled ||
           this.telemetry.truck.adBlue.warning.enabled ||
           this.telemetry.truck.engine.oilPressure.warning.enabled ||
           this.telemetry.truck.engine.waterTemperature.warning.enabled ||
           this.telemetry.truck.engine.batteryVoltage.warning.enabled) &&
          this.telemetry.truck.electric.enabled
      );
    },
    haveErrors() {
      return this.telemetry.truck.brakes.airPressure.emergency.enabled &&
             this.telemetry.truck.electric.enabled
    },
    hasEngineWarning() {
      return this.telemetry.truck.engine.damage >= 0.5; // >= 50%
    }
  },
  created() {
    Object.keys(formatConstants).forEach((key) => {
      const value = formatConstants[key];
      this[key] = value;
    });
  },
  methods: {
    ...telemetryCommon,
    ...telemetryGear,
    ...telemetryHelper,
    ...telemetryJob,
    ...telemetryNavigation,
    ...telemetryTrailer,
    ...telemetryTruck,
    ...telemetryUnitConverter
  },
  watch: {
    'telemetry.truck.electric.enabled': function (newValue) {
      if (newValue && !this.telemetry.truck.engine.enabled) {
        this.truckElectricOnValue = true;
        this.truckElectricOnTimer = setTimeout(() => {
          this.truckElectricOnValue = false;
        }, 1000);
      } else {
        this.truckElectricOnValue = false;
        this.truckElectricOnTimer = null;
      }
    }
  },
};
</script>
