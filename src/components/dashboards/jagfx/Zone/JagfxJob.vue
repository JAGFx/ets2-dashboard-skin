<template>
  <div class="job">
    <ul class="dash-element left">
      <li
        :class="{ disabled: !telemetry2.job.hasAnActiveJob }"
        class="multiline default"
      >
        <div class="round from">
          <i class="icon-startpoint" />
        </div>
        <span v-if="!telemetry2.truck.ignitionIsTurnedOn" />
        <span v-else-if="!telemetry2.job.hasAnActiveJob">{{ $t('N/A') }}</span>
        <span v-else>
          <span>{{ telemetry2.job.departureCityName }}</span>
          <small
            class="text-muted text-italic text-size-1rem text-line-height-1rem"
            >{{ telemetry2.job.departureCompanyName }}</small
          >
        </span>
      </li>
      <li
        :class="{ disabled: !telemetry2.job.hasAnActiveJob }"
        class="multiline default"
      >
        <div class="round to">
          <i class="icon-endpoint" />
        </div>
        <span v-if="!telemetry2.truck.ignitionIsTurnedOn" />
        <span v-else-if="!telemetry2.job.hasAnActiveJob">{{ $t('N/A') }}</span>
        <span v-else>
          <span>{{ telemetry2.job.arrivalCityName }}</span>
          <small
            class="text-muted text-italic text-size-1rem text-line-height-1rem"
          >
            {{ telemetry2.job.arrivalCompanyName }}
          </small>
        </span>
      </li>
      <li :class="{ disabled: !telemetry2.job.hasAnActiveJob }" class="default">
        <div class="round">
          <i class="icon-time" />
        </div>
        <span v-if="!telemetry2.truck.ignitionIsTurnedOn" />
        <span
          v-else-if="
            telemetry2.job.hasAnActiveJob &&
            telemetry2.job.deliveryTimeIsSetToDuDate
          "
          >{{
            $dateTimeLocalized(
              telemetry2.job.expectedDeliveryTime,
              DATE_FORMAT_LONG,
              TIME_FORMAT_SHORT
            )
          }}</span
        >
        <span
          v-else-if="
            telemetry2.job.hasAnActiveJob &&
            !telemetry2.job.deliveryTimeIsSetToDuDate
          "
          >{{ telemetry2.job.remainingDeliveryTime }}</span
        >
        <span v-else>{{ $t('N/A') }}</span>
      </li>
      <li :class="{ disabled: !telemetry2.job.hasAnActiveJob }" class="default">
        <div class="round">
          <i class="icon-currency" />
        </div>
        <span v-if="!telemetry2.truck.ignitionIsTurnedOn" />
        <span v-else-if="!telemetry2.job.hasAnActiveJob">{{ $t('N/A') }}</span>
        <span v-else>
          {{ telemetry2.job.income }} {{ $unitReadable('unit_currency') }}
        </span>
      </li>
      <li
        :class="{ disabled: !telemetry2.navigation.hasAnActiveNavigation }"
        class="default"
      >
        <div class="round">
          <i class="icon-ruler" />
        </div>

        <span v-if="!telemetry2.truck.ignitionIsTurnedOn" />
        <span v-else-if="!telemetry2.navigation.hasAnActiveNavigation">
          {{ $t('N/A') }}
        </span>
        <span v-else> {{ telemetry2.navigation.distanceToTargetString }}</span>
      </li>
      <li :class="{ disabled: !telemetry2.job.hasAnActiveJob }" class="default">
        <div class="round">
          <i class="icon-weight" />
        </div>
        <span v-if="!telemetry2.truck.ignitionIsTurnedOn" />
        <span v-else-if="!telemetry2.job.hasAnActiveJob">{{ $t('N/A') }}</span>
        <span v-else>{{ telemetry2.job.cargoWeightString }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'JagfxJob',
  mixins: [TelemetryMixin]
};
</script>
