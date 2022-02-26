import { store as telemetryStore } from '@/store/telemetry.store';
import { diffDateTimeLocalized } from '@/utils/_app';
import { $gameTime } from '@/utils/telemetry/_helper.utils';

export const $etaDueDate = () => {
  const currentGameTime = $gameTime();
  return telemetryStore.telemetry.navigation.time + currentGameTime;
};

export const $etaRemaing = () => {
  const currentGameTime = $gameTime();
  const etaTime = $etaDueDate();

  return diffDateTimeLocalized(currentGameTime, etaTime);
};

export const $haveAnActiveNavigation = () => {
  return telemetryStore.telemetry.navigation.distance > 0;
};

export const $haveAnActiveSpeedLimit = () => {
  return telemetryStore.telemetry.navigation.speedLimit.value > 0;
};
