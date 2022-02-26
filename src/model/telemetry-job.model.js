import { store as telemetryStore } from '@/store/telemetry.store';
import { displayDuration } from '@/utils/_app';
import {
  unit_currency,
  unit_weight
} from '@/utils/telemetry/_unit-converter.utils';

export default class TelemetryJob {
  get expectedDeliveryTime() {
    return telemetryStore.telemetry.job.market.id === 'external_contracts'
      ? telemetryStore.telemetry.job.expectedDeliveryTimestamp.value
      : telemetryStore.telemetry.job.expectedDeliveryTimestamp.unix;
  }
  get remainingDeliveryTime() {
    const gameTime = telemetryStore.model.gameTime;
    let diff = this.expectedDeliveryTime - gameTime;

    return displayDuration(diff);
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
    return telemetryStore.telemetry.job.destination.city.name;
  }
  get arrivalCompanyName() {
    return telemetryStore.telemetry.job.destination.company.name;
  }
  get income() {
    return unit_currency(
      this.hasAnActiveJob ? telemetryStore.telemetry.job.income : 0,
      true,
      false
    );
  }
  get cargoWeight() {
    return unit_weight(telemetryStore.telemetry.job.cargo.mass, true, false);
  }
  get cargoWeightString() {
    return unit_weight(telemetryStore.telemetry.job.cargo.mass);
  }
  get cargoName() {
    return telemetryStore.telemetry.job.cargo.name;
  }
}
