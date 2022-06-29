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
      truckElectricOnTimer: null,
      telemetry2: telemetryStore.model
    };
  },
  computed: {
    /** @deprecated **/
    telemetry: () => telemetryStore.telemetry,
    receivedData: () => telemetryStore.receivedData
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
    $nextRestStopFormater: (time) => {
      return diffDateTimeLocalized(0, time, false);
    },
    $telemetryDataIsEnough: () => telemetryDataIsEnough(),
    ...telemetryUnitConverter
  }
};
</script>
