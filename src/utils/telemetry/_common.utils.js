import store from '@/store';
import { store as telemetryStore } from '@/store/telemetry.store';

export const config = (name) => store.getters['config/get'](name);
export const averageDamage = (arrayDamage) => {
  const keyLength = Object.keys(arrayDamage).filter(
    (k) => k !== 'total'
  ).length;
  let sum = 0;

  for (const key in arrayDamage) {
    if (key !== 'total') sum += arrayDamage[key];
  }

  return Math.floor(100 * (sum / keyLength));
};
export const scale = (currentSkin) => {
  const scaleX =
    currentSkin.size.width === 0
      ? 1
      : window.innerWidth / currentSkin.size.width;

  const scaleY =
    currentSkin.size.height === 0
      ? 1
      : (window.innerHeight - 41) / currentSkin.size.height;

  return Math.min(scaleX, scaleY);
};

export const telemetryDataIsEnough = () => {
  return (
    telemetryStore.receivedData &&
    telemetryStore.model.gameSdkIsActive &&
    telemetryStore.model.truck.hasTruck &&
    store.getters['config/gameConfigLoaded']
  );
};
