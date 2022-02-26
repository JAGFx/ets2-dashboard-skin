import store from '@/store';
import { store as telemetryStore } from '@/store/telemetry.store';
import { dateTimeLocalized, flag } from '@/utils/_app';

export const config = (name) => store.getters['config/get'](name);
export const $flag = (countryName, gameID) => flag(countryName, gameID);
export const $averageDamage = (arrayDamage) => {
  const keyLength = Object.keys(arrayDamage).filter(
    (k) => k !== 'total'
  ).length;
  let sum = 0;

  for (const key in arrayDamage) {
    if (key !== 'total') sum += arrayDamage[key];
  }

  return Math.floor(100 * (sum / keyLength));
};
export const $scale = (currentSkin) => {
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

export const $hasWarnings = () => {
  return (
    (telemetryStore.telemetry.truck.brakes.airPressure.warning.enabled ||
      telemetryStore.telemetry.truck.fuel.warning.enabled ||
      telemetryStore.telemetry.truck.adBlue.warning.enabled ||
      telemetryStore.telemetry.truck.engine.oilPressure.warning.enabled ||
      telemetryStore.telemetry.truck.engine.waterTemperature.warning.enabled ||
      telemetryStore.telemetry.truck.engine.batteryVoltage.warning.enabled) &&
    telemetryStore.telemetry.truck.electric.enabled
  );
};

export const $hasErrors = () => {
  return (
    telemetryStore.telemetry.truck.brakes.airPressure.emergency.enabled &&
    telemetryStore.telemetry.truck.electric.enabled
  );
};

export const $hasEngineWarning = () => {
  return telemetryStore.telemetry.truck.engine.damage >= 0.5; // >= 50%
};

export const $dateTimeLocalized = (time, dFormat, tFormat) => {
  return dateTimeLocalized(time, dFormat, tFormat);
};
export const $toFixed = (value, decimal) => {
  return value.toFixed(decimal);
};
