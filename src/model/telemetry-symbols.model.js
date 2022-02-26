import { store as telemetryStore } from '@/store/telemetry.store';

export default class TelemetrySymbols {
  get beaconIsEnabled() {
    return telemetryStore.telemetry.truck.lights.beacon.enabled;
  }
  get leftDirectionIsActive() {
    return telemetryStore.telemetry.truck.lights.blinker.left.active;
  }
  get rightDirectionIsActive() {
    return telemetryStore.telemetry.truck.lights.blinker.right.active;
  }
  get mainBeamIsEnabled() {
    return (
      telemetryStore.telemetry.truck.lights.beamHigh.enabled &&
      telemetryStore.telemetry.truck.lights.beamLow.enabled &&
      telemetryStore.telemetry.truck.engine.enabled
    );
  }
  get lowBeamIsEnabled() {
    return (
      telemetryStore.telemetry.truck.lights.beamLow.enabled &&
      telemetryStore.telemetry.truck.engine.enabled
    );
  }
  get brakePressureIsActive() {
    return this.brakePressureIsLow || this.brakePressureIsCriticalLow;
  }
  get brakePressureIsLow() {
    return telemetryStore.telemetry.truck.brakes.airPressure.warning.enabled;
  }
  get brakePressureIsCriticalLow() {
    return telemetryStore.telemetry.truck.brakes.airPressure.emergency.enabled;
  }
  get parkingBrakeIsEnabled() {
    return (
      telemetryStore.telemetry.truck.brakes.parking.enabled &&
      telemetryStore.telemetry.truck.electric.enabled
    );
  }
  get retarderIsActive() {
    return telemetryStore.telemetry.truck.brakes.retarder.level > 0;
  }
  get differentialIsLocked() {
    return telemetryStore.telemetry.truck.differential.lock.enabled;
  }
  get truckLiftAxleIsEnabled() {
    return telemetryStore.telemetry.truck.liftAxle.enabled;
  }
  get trailerLiftAxleIsEnabled() {
    return telemetryStore.telemetry.trailer.liftAxle.enabled;
  }
  get fuelLevelIsLow() {
    return telemetryStore.telemetry.truck.fuel.warning.enabled;
  }
  get engineWaterTemperatureIsHot() {
    return telemetryStore.telemetry.truck.engine.waterTemperature.warning
      .enabled;
  }
  get batteryVoltageIdLow() {
    return telemetryStore.telemetry.truck.engine.batteryVoltage.warning.enabled;
  }
}
