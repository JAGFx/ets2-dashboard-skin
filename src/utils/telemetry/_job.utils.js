import store from '@/store';
import { store as telemetryStore } from '@/store/telemetry.store';
import { diffDateTimeLocalized, displayDuration } from '@/utils/_app';
import { config } from '@/utils/telemetry/_common.utils';

export const $hasJob = () => {
  return telemetryStore.telemetry.job.cargo.id.length !== 0;
};
export const $jobRemainingTimeDelivery = (time) => {
  const gameTime = telemetryStore.telemetry.game.time.value;
  let diff = time - gameTime;

  return displayDuration(diff);
};

export const $jobRemainingTimeToDueDate = () => {
  return config('general_job_remaining') === 'due_date';
};

export const $nextRestStop = (time, customFormat) => {
  return diffDateTimeLocalized(0, time, false, customFormat);
};

export const $jobDeliveryTime = () => {
  return telemetryStore.telemetry.job.market.id === 'external_contracts'
    ? telemetryStore.telemetry.job.expectedDeliveryTimestamp.value
    : telemetryStore.telemetry.job.expectedDeliveryTimestamp.unix;
};

export const $telemetryDataIsEnough = () => {
  return (
    telemetryStore.receivedData &&
    telemetryStore.telemetry.game.sdkActive &&
    telemetryStore.telemetry.truck.brand.id.length !== 0 &&
    store.getters['config/gameConfigLoaded']
  );
};
