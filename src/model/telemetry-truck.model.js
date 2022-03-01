import { store as telemetryStore } from '@/store/telemetry.store';
import { flag } from '@/utils/_app';
import { averageDamage, config } from '@/utils/telemetry/_common.utils';
import {
  truckGear,
  truckShifterTypeLetter
} from '@/utils/telemetry/_grear.utils';
import {
  unit_consumption,
  unit_degrees,
  unit_length,
  unit_pressure,
  unit_speed,
  unit_volume
} from '@/utils/telemetry/_unit-converter.utils';

export default class TelemetryTruck {
  // <editor-folder> Common
  get speed() {
    return unit_speed(telemetryStore.telemetry.truck.speed.value, true, false);
  }
  get rpm() {
    return telemetryStore.telemetry.truck.engine.rpm.value;
  }
  get maxRpm() {
    return telemetryStore.telemetry.truck.engine.rpm.max;
  }
  get odometer() {
    return unit_length(
      telemetryStore.telemetry.truck.odometer,
      'km',
      true,
      false
    );
  }
  get batteryVoltage() {
    return telemetryStore.telemetry.truck.engine.batteryVoltage.value;
  }
  get hasTruck() {
    return telemetryStore.telemetry.truck.brand.id.length !== 0;
  }
  get countryIdOfLicensePlate() {
    return telemetryStore.telemetry.truck.licensePlate.country.id;
  }
  get countryFlagOfLicensePlate() {
    return flag(
      this.countryIdOfLicensePlate,
      telemetryStore.telemetry.game.game.id
    );
  }
  get licensePlate() {
    return telemetryStore.telemetry.truck.licensePlate.value.replace('.', '');
  }
  get averageDamage() {
    return averageDamage(telemetryStore.telemetry.truck.damage);
  }
  get chassisDamage() {
    return telemetryStore.telemetry.truck.damage.chassis * 100;
  }
  get damage() {
    return config('general_damage_accurate') === 'damage-diagnostic'
      ? this.averageDamage
      : Math.floor(this.chassisDamage);
  }
  get engineIsStarted() {
    return telemetryStore.telemetry.truck.engine.enabled;
  }
  get ignitionIsTurnedOn() {
    return telemetryStore.telemetry.truck.electric.enabled;
  }
  get ignitionStart() {
    return telemetryStore.telemetry.truck.electric.start;
  }
  // </editor-folder> Common

  // <editor-folder> Fuel
  get fuelLevel() {
    return this.ignitionIsTurnedOn
      ? unit_volume(telemetryStore.telemetry.truck.fuel.value, true, false)
      : 0;
  }
  get fuelCapacity() {
    return unit_volume(
      telemetryStore.telemetry.truck.fuel.capacity,
      true,
      false
    );
  }
  get fuelAverageConsumption() {
    return unit_consumption(
      telemetryStore.telemetry.truck.fuel.avgConsumption,
      true,
      false
    );
  }
  get fuelFactor() {
    return telemetryStore.telemetry.truck.fuel.warning.factor;
  }
  // </editor-folder> Fuel

  // <editor-folder> AdBlue
  get adBlueLevel() {
    return unit_volume(
      telemetryStore.telemetry.truck.adBlue.value,
      true,
      false
    );
  }
  get adBlueCapacity() {
    return unit_volume(
      telemetryStore.telemetry.truck.adBlue.capacity,
      true,
      false
    );
  }
  // </editor-folder> AdBlue

  // <editor-folder> Pressures
  get oilPressure() {
    return this.ignitionIsTurnedOn
      ? unit_pressure(
          telemetryStore.telemetry.truck.engine.oilPressure.value,
          true,
          false
        )
      : 0;
  }
  get brakeAirPressure() {
    return this.ignitionIsTurnedOn
      ? unit_pressure(
          telemetryStore.telemetry.truck.brakes.airPressure.value,
          true,
          false
        )
      : 0;
  }
  // </editor-folder> Pressures

  // <editor-folder> Temperature
  get engineWaterTemperature() {
    return this.ignitionIsTurnedOn
      ? unit_degrees(
          telemetryStore.telemetry.truck.engine.waterTemperature.value,
          true,
          false
        )
      : 0;
  }
  get engineOilTemperature() {
    return this.ignitionIsTurnedOn
      ? unit_degrees(
          telemetryStore.telemetry.truck.engine.oilTemperature.value,
          true,
          false
        )
      : 0;
  }
  get brakeTemperature() {
    return this.ignitionIsTurnedOn
      ? unit_degrees(
          telemetryStore.telemetry.truck.brakes.temperature.value,
          true,
          false
        )
      : 0;
  }
  // </editor-folder> Temperature

  // <editor-folder> Informations
  get hasWarnings() {
    return (
      ((telemetryStore.telemetry.truck.brakes.airPressure.warning.enabled ||
        telemetryStore.telemetry.truck.fuel.warning.enabled ||
        telemetryStore.telemetry.truck.adBlue.warning.enabled ||
        telemetryStore.telemetry.truck.engine.oilPressure.warning.enabled ||
        telemetryStore.telemetry.truck.engine.waterTemperature.warning
          .enabled ||
        telemetryStore.telemetry.truck.engine.batteryVoltage.warning.enabled) &&
        telemetryStore.telemetry.truck.electric.enabled) ||
      this.ignitionStart
    );
  }
  get hasErrors() {
    return (
      (telemetryStore.telemetry.truck.brakes.airPressure.emergency.enabled &&
        telemetryStore.telemetry.truck.electric.enabled) ||
      this.ignitionStart
    );
  }
  get hasEngineWarning() {
    return (
      telemetryStore.telemetry.truck.engine.damage >= 0.5 || this.ignitionStart
    );
  }
  // </editor-folder> Informations

  // <editor-folder> Transmission
  get shifterType() {
    return telemetryStore.telemetry.truck.transmission.shifterType;
  }
  get shifterTypeLetter() {
    return truckShifterTypeLetter(this.shifterType);
  }
  get gear() {
    return telemetryStore.telemetry.truck.transmission.gear.displayed;
  }
  get gearDisplayed() {
    return truckGear(this.gear, this.shifterType, this.brandName);
  }
  get gearDisplayedWithoutShifterType() {
    return truckGear(this.gear, this.shifterType, this.brandName, false);
  }
  // </editor-folder> Transmission

  // <editor-folder> Cruise control
  get cruiseControlIsEnabled() {
    return telemetryStore.telemetry.truck.cruiseControl.enabled;
  }
  get cruiseControlSpeed() {
    return unit_speed(
      telemetryStore.telemetry.truck.cruiseControl.value,
      true,
      false
    );
  }
  // </editor-folder> Cruise control

  // <editor-folder> Brand
  get brandName() {
    return telemetryStore.telemetry.truck.brand.name;
  }
  get brandId() {
    return telemetryStore.telemetry.truck.brand.id;
  }
  get modelName() {
    return telemetryStore.telemetry.truck.model.name;
  }
  get modelId() {
    return telemetryStore.telemetry.truck.model.id;
  }
  // </editor-folder> Brand

  get positionX() {
    return telemetryStore.telemetry.truck.position.X;
  }

  get positionY() {
    return telemetryStore.telemetry.truck.position.Y;
  }
}
