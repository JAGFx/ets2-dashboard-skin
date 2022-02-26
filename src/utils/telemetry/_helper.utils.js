import { store as telemetryStore } from '@/store/telemetry.store';

export const $gameTime = () => telemetryStore.telemetry.game.time.unix;

//export const $truckElectricOn = () => {
//  return telemetryStore.telemetry.truck.electric.enabled;
//};
