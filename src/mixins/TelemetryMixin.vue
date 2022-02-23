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
  computed: {
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
    ...telemetryCommon,
    ...telemetryGear,
    ...telemetryHelper,
    ...telemetryJob,
    ...telemetryNavigation,
    ...telemetryTrailer,
    ...telemetryTruck,
    ...telemetryUnitConverter
  }
};
</script>
