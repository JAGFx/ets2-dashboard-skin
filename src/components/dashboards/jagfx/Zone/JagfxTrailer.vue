<template>
  <div class="trailer capitalized">
    <div class="t-info">
      <div class="trailer-data">
        <div
          v-if="telemetry2.job.hasAnActiveJob && telemetry2.trailer.hasATrailer"
          class="job"
        >
          {{ telemetry2.job.cargoName }}
        </div>
        <div v-else-if="telemetry2.trailer.hasATrailer" class="job disabled">
          <i>-- {{ $t('No Job') }} --</i>
        </div>
        <div v-else class="job disabled">
          <i>-- {{ $t('No trailer') }} --</i>
        </div>
      </div>
      <div class="job-data">
        <small class="licencePlate left">
          <span class="flag">
            {{ telemetry2.trailer.countryFlagOfLicensePlate }}
          </span>
          <span v-if="telemetry2.trailer.hasATrailer" class="w-100 text-center">
            <span>{{ telemetry2.trailer.licensePlate }}</span>
          </span>
          <span v-else class="w-100 text-center">{{ $t('N/A') }}</span>
        </small>
        <div v-if="telemetry2.trailer.hasATrailer" class="damage left">
          {{ telemetry2.trailer.damage }} %
        </div>
        <div v-else class="damage left">
          {{ $t('N/A') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'JagfxTrailer',
  mixins: [TelemetryMixin]
};
</script>
