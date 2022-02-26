import { store as telemetryStore } from '@/store/telemetry.store';
import {
  averageDamage,
  $hasErrors,
  $hasWarnings,
  scale
} from '@/utils/telemetry/_common.utils';
import { jest } from '@jest/globals';
import { applyChangesOnTelemetryFromDataProvider } from '../../../test.helper';

describe('Telemetry common utils', () => {
  jest.mock('@/store/telemetry.store');

  describe('$scale', () => {
    const windowWidth = 1920;
    const windowHeight = 1080;

    global.innerWidth = windowWidth;
    global.innerHeight = windowHeight + 41;

    test.each([
      { size: { width: 2560, height: windowHeight } },
      { size: { width: 0, height: windowHeight } },
      { size: { width: 4096, height: 2048 } },
      { size: { width: windowWidth, height: 2048 } },
      { size: { width: windowWidth, height: 0 } },
      { size: { width: windowWidth, height: windowHeight } },
      { size: { width: 0, height: 0 } }
    ])('The skin should be reduced', (currentSkin) => {
      expect(scale(currentSkin)).toBeLessThan(1);
    });

    test.each([
      { size: { width: 1280, height: windowHeight } },
      { size: { width: 0, height: windowHeight } },
      { size: { width: 1280, height: 720 } },
      { size: { width: windowWidth, height: 720 } },
      { size: { width: windowWidth, height: 0 } },
      { size: { width: windowWidth, height: windowHeight } },
      { size: { width: 0, height: 0 } }
    ])('The skin should be enlarged', (currentSkin) => {
      expect(scale(currentSkin)).toBeGreaterThanOrEqual(1);
    });
  });

  describe('$averageDamage', () => {
    test.each([
      {
        cabin: 0.1,
        chassis: 0.2,
        engine: 0.3,
        transmission: 0.4,
        wheels: 0.5,
        total: 0
      }
    ])('The average damage should be correct', (arrayDamage) => {
      expect(averageDamage(arrayDamage)).toBe(30);
    });
  });

  describe('$hasWarnings', () => {
    test.each([
      {
        'truck.brakes.airPressure.warning.enabled': true,
        'truck.fuel.warning.enabled': true,
        'truck.adBlue.warning.enabled': true,
        'truck.engine.oilPressure.warning.enabled': true,
        'truck.engine.waterTemperature.warning.enabled': true,
        'truck.engine.batteryVoltage.warning.enabled': true
      },
      {
        'truck.brakes.airPressure.warning.enabled': true,
        'truck.fuel.warning.enabled': false,
        'truck.adBlue.warning.enabled': false,
        'truck.engine.oilPressure.warning.enabled': false,
        'truck.engine.waterTemperature.warning.enabled': false,
        'truck.engine.batteryVoltage.warning.enabled': false
      },
      {
        'truck.brakes.airPressure.warning.enabled': false,
        'truck.fuel.warning.enabled': true,
        'truck.adBlue.warning.enabled': false,
        'truck.engine.oilPressure.warning.enabled': false,
        'truck.engine.waterTemperature.warning.enabled': false,
        'truck.engine.batteryVoltage.warning.enabled': false
      },
      {
        'truck.brakes.airPressure.warning.enabled': false,
        'truck.fuel.warning.enabled': false,
        'truck.adBlue.warning.enabled': true,
        'truck.engine.oilPressure.warning.enabled': false,
        'truck.engine.waterTemperature.warning.enabled': false,
        'truck.engine.batteryVoltage.warning.enabled': false
      },
      {
        'truck.brakes.airPressure.warning.enabled': false,
        'truck.fuel.warning.enabled': false,
        'truck.adBlue.warning.enabled': false,
        'truck.engine.oilPressure.warning.enabled': true,
        'truck.engine.waterTemperature.warning.enabled': false,
        'truck.engine.batteryVoltage.warning.enabled': false
      },
      {
        'truck.brakes.airPressure.warning.enabled': false,
        'truck.fuel.warning.enabled': false,
        'truck.adBlue.warning.enabled': false,
        'truck.engine.oilPressure.warning.enabled': false,
        'truck.engine.waterTemperature.warning.enabled': true,
        'truck.engine.batteryVoltage.warning.enabled': false
      },
      {
        'truck.brakes.airPressure.warning.enabled': false,
        'truck.fuel.warning.enabled': false,
        'truck.adBlue.warning.enabled': false,
        'truck.engine.oilPressure.warning.enabled': false,
        'truck.engine.waterTemperature.warning.enabled': false,
        'truck.engine.batteryVoltage.warning.enabled': true
      }
    ])('The global warning should be truthy', (config) => {
      applyChangesOnTelemetryFromDataProvider(telemetryStore, config);
      expect($hasWarnings()).toBeTruthy();
    });
  });

  describe('$hasErrors', () => {
    test.each([{ 'truck.brakes.airPressure.emergency.enabled': true }])(
      'The global error should be truthy',
      (config) => {
        applyChangesOnTelemetryFromDataProvider(telemetryStore, config);
        expect($hasErrors()).toBeTruthy();
      }
    );
  });
});
