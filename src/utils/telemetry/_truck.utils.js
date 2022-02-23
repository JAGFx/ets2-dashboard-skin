import { store as telemetryStore } from '@/store/telemetry.store';
import { $averageDamage, config } from '@/utils/telemetry/_common.utils';

export const $hasTruck = () => {
  return telemetryStore.telemetry.truck.brand.id.length !== 0;
};

export const $truckDamage = () => {
  return config('general_damage_accurate') === 'damage-diagnostic'
    ? $averageDamage(telemetryStore.telemetry.truck.damage)
    : Math.floor(100 * telemetryStore.telemetry.truck.damage.chassis);
};
