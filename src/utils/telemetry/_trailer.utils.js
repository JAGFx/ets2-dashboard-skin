import { store as telemetryStore } from '@/store/telemetry.store';
import { $averageDamage, config } from '@/utils/telemetry/_common.utils';

export const $hasTrailer = () => {
  return telemetryStore.telemetry.trailer.model.id.length !== 0;
};
export const $hasTrailerAndJob = () => {
  return (
    telemetryStore.telemetry.trailer.model.id.length !== 0 &&
    telemetryStore.telemetry.job.cargo.name.length !== 0
  );
};
export const $trailerDamage = () => {
  return config('general_damage_accurate') === 'damage-diagnostic'
    ? $averageDamage(telemetryStore.telemetry.trailer.damage)
    : Math.floor(100 * telemetryStore.telemetry.trailer.damage.chassis);
};
