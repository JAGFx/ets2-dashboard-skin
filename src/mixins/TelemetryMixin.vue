<script>
import { store as telemetryStore } from '@/store/telemetry.store';
import {
  dateTimeLocalized,
  diffDateTimeLocalized,
  formatConstants
} from '@/utils/_app';
import { config, telemetryDataIsEnough } from '@/utils/telemetry/_common.utils';
import * as telemetryUnitConverter from '@/utils/telemetry/_unit-converter.utils';

export default {
  name: 'TelemetryMixin',
  data() {
    return {
      truckElectricOnValue: false,
      truckElectricOnTimer: null,
      telemetry2: telemetryStore.model
    };
  },
  computed: {
    /** @deprecated **/
    telemetry: () => telemetryStore.telemetry,
    receivedData: () => telemetryStore.receivedData,
    $truckElectricOn() {
      return this.truckElectricOnValue;
    }
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
  created() {
    Object.keys(formatConstants).forEach((key) => {
      const value = formatConstants[key];
      this[key] = value;
    });
  },
  methods: {
    config: (name) => config(name),
    $dateTimeLocalized: (time, dFormat, tFormat) => {
      return dateTimeLocalized(time, dFormat, tFormat);
    },
    $nextRestStop: (time, customFormat) => {
      return diffDateTimeLocalized(0, time, false, customFormat);
    },
    $telemetryDataIsEnough: () => telemetryDataIsEnough(),
    $jobRemainingTimeToDueDate: () => {
      return config('general_job_remaining') === 'due_date';
    },
    $trailerDamage: () => {
      return config('general_damage_accurate') === 'damage-diagnostic'
        ? telemetryStore.model.trailer.averageDamage
        : Math.floor(telemetryStore.model.trailer.chassisDamage);
    },
    $truckDamage: () => {
      return config('general_damage_accurate') === 'damage-diagnostic'
        ? telemetryStore.model.truck.averageDamage
        : Math.floor(telemetryStore.model.truck.chassisDamage);
    },
    ...telemetryUnitConverter
  }
};
</script>
