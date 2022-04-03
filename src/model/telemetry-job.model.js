import { store as telemetryStore } from '@/store/telemetry.store';
import { displayDuration } from '@/utils/_app';
import { config } from '@/utils/telemetry/_common.utils';
import {
  unit_currency,
  unit_weight
} from '@/utils/telemetry/_unit-converter.utils';

export default class TelemetryJob {
  get expectedDeliveryTime() {
    if (!this.hasAnActiveJob) return null;

    return telemetryStore.telemetry.job.market.id === 'external_contracts'
      ? telemetryStore.telemetry.job.expectedDeliveryTimestamp.value
      : telemetryStore.telemetry.job.expectedDeliveryTimestamp.unix;
  }
  get remainingTimeForDeliveryTime() {
    if (!this.hasAnActiveJob) return null;

    const gameTime = telemetryStore.model.gameTime;
    let diff = this.expectedDeliveryTime - gameTime;

    return displayDuration(diff);
  }
  get deliveryTimeIsSetToDuDate() {
    return config('general_job_remaining') === 'due_date';
  }
  get hasAnActiveJob() {
    return telemetryStore.telemetry.job.cargo.id.length !== 0;
  }
  get departureCityName() {
    return this.hasAnActiveJob
      ? telemetryStore.telemetry.job.source.city.name
      : null;
  }
  get departureCompanyName() {
    return this.hasAnActiveJob
      ? telemetryStore.telemetry.job.source.company.name
      : null;
  }
  get arrivalCityName() {
    return this.hasAnActiveJob
      ? telemetryStore.telemetry.job.destination.city.name
      : null;
  }
  get arrivalCompanyName() {
    return this.hasAnActiveJob
      ? telemetryStore.telemetry.job.destination.company.name
      : null;
  }
  get income() {
    return this.hasAnActiveJob
      ? unit_currency(
          this.hasAnActiveJob ? telemetryStore.telemetry.job.income : 0,
          true,
          false
        )
      : 0;
  }
  get cargoWeight() {
    return this.hasAnActiveJob
      ? unit_weight(telemetryStore.telemetry.job.cargo.mass, true, false)
      : 0;
  }
  get cargoWeightString() {
    return this.hasAnActiveJob
      ? unit_weight(telemetryStore.telemetry.job.cargo.mass)
      : null;
  }
  get cargoName() {
    return this.hasAnActiveJob ? telemetryStore.telemetry.job.cargo.name : null;
  }
}
