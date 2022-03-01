import { store as telemetryStore } from '@/store/telemetry.store';

export default class TelemetrySymbols {
  get beaconIsEnabled() {
    return (
      telemetryStore.telemetry.truck.lights.beacon.enabled ||
      telemetryStore.model.truck.ignitionIsTurnedOn
    );
  }
  get leftDirectionIsActive() {
    return (
      telemetryStore.telemetry.truck.lights.blinker.left.active ||
      telemetryStore.model.truck.ignitionIsTurnedOn
    );
  }
  get rightDirectionIsActive() {
    return (
      telemetryStore.telemetry.truck.lights.blinker.right.active ||
      telemetryStore.model.truck.ignitionIsTurnedOn
    );
  }
  get mainBeamIsEnabled() {
    return (
      (telemetryStore.telemetry.truck.lights.beamHigh.enabled &&
        telemetryStore.telemetry.truck.lights.beamLow.enabled &&
        telemetryStore.telemetry.truck.engine.enabled) ||
      telemetryStore.model.truck.ignitionIsTurnedOn
    );
  }
  get lowBeamIsEnabled() {
    return (
      (telemetryStore.telemetry.truck.lights.beamLow.enabled &&
        telemetryStore.telemetry.truck.engine.enabled) ||
      telemetryStore.model.truck.ignitionIsTurnedOn
    );
  }
  get brakePressureIsActive() {
    return this.brakePressureIsLow || this.brakePressureIsCriticalLow;
  }
  get brakePressureIsLow() {
    return (
      telemetryStore.telemetry.truck.brakes.airPressure.warning.enabled ||
      telemetryStore.model.truck.ignitionStart
    );
  }
  get brakePressureIsCriticalLow() {
    return (
      telemetryStore.telemetry.truck.brakes.airPressure.emergency.enabled ||
      telemetryStore.model.truck.ignitionStart
    );
  }
  get parkingBrakeIsEnabled() {
    return (
      (telemetryStore.telemetry.truck.brakes.parking.enabled &&
        telemetryStore.telemetry.truck.electric.enabled) ||
      telemetryStore.model.truck.ignitionStart
    );
  }
  get retarderIsActive() {
    return (
      (telemetryStore.telemetry.truck.brakes.retarder.level > 0 &&
        telemetryStore.telemetry.controls.input.throttle === 0) ||
      telemetryStore.model.truck.ignitionStart
    );
  }
  get differentialIsLocked() {
    return (
      telemetryStore.telemetry.truck.differential.lock.enabled ||
      telemetryStore.model.truck.ignitionStart
    );
  }
  get truckLiftAxleIsEnabled() {
    return (
      telemetryStore.telemetry.truck.liftAxle.enabled ||
      telemetryStore.model.truck.ignitionStart
    );
  }
  get trailerLiftAxleIsEnabled() {
    return (
      telemetryStore.telemetry.trailer.liftAxle.enabled ||
      telemetryStore.model.truck.ignitionStart
    );
  }
  get fuelLevelIsLow() {
    return telemetryStore.telemetry.truck.fuel.warning.enabled;
  }
  get engineWaterTemperatureIsHot() {
    return (
      telemetryStore.telemetry.truck.engine.waterTemperature.warning.enabled ||
      telemetryStore.model.truck.ignitionStart
    );
  }
  get batteryVoltageIdLow() {
    return (
      telemetryStore.telemetry.truck.engine.batteryVoltage.warning.enabled ||
      telemetryStore.model.truck.ignitionStart
    );
  }
}
