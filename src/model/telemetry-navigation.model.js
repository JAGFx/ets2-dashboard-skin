import { store as telemetryStore } from '@/store/telemetry.store';
import { diffDateTimeLocalized } from '@/utils/_app';
import {
  unit_length,
  unit_speed
} from '@/utils/telemetry/_unit-converter.utils';

export default class TelemetryNavigation {
  get nextRestStopTime() {
    return telemetryStore.telemetry.navigation.nextRestStop;
  }
  get etaDueDate() {
    return (
      telemetryStore.telemetry.navigation.time +
      telemetryStore.telemetry.game.time.unix
    );
  }
  get etaRemainingTime() {
    const currentGameTime = telemetryStore.model.gameTime;
    const etaTime = this.etaDueDate;

    return diffDateTimeLocalized(currentGameTime, etaTime);
  }
  get hasAnActiveNavigation() {
    return telemetryStore.telemetry.navigation.distance > 0;
  }
  get hasAnActiveSpeedLimit() {
    return telemetryStore.telemetry.navigation.speedLimit.value > 0;
  }
  get distanceToTargetValue() {
    return telemetryStore.telemetry.navigation.distance;
  }
  get distanceToTargetString() {
    return this.distanceToTargetValue < 1000
      ? unit_length(this.distanceToTargetValue, 'm')
      : unit_length(this.distanceToTargetValue);
  }
  get speedLimitValue() {
    return this.hasAnActiveSpeedLimit
      ? unit_speed(
          telemetryStore.telemetry.navigation.speedLimit.value,
          true,
          false
        )
      : 0;
  }
}
