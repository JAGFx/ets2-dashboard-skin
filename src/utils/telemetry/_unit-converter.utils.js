import { config } from '@/utils/telemetry/_common.utils';
import {
  length as uc_length,
  mass as uc_mass,
  pressure as uc_pressure,
  temperature as uc_temperature,
  volume as uc_volume,
  speed as uc_speed
} from 'units-converter';

export const unit_speed = (value, showValue = true, showSymbol = true) => {
  const speed = config('unit_speed');
  let unit = '';

  //value = value[speed];

  switch (speed) {
    case 'kph':
      unit = 'km/h';
      break;
    case 'mph':
      unit = 'm/h';
      break;
  }
  const conversion = uc_speed(value).from('m/s').to(unit);
  value = conversion.value;

  if (showValue && !showSymbol) return value;

  if (!showValue && showSymbol) return unit;

  return value.toFixed(0) + ' ' + unit;
};
export const unit_currency = (value, showValue = true, showSymbol = true) => {
  const currencySymbolValue = config('unit_currency');
  let unit = '';

  switch (currencySymbolValue) {
    case 'EUR':
      unit = '€';
      break;
    case 'GBP':
      unit = '£';
      value *= 0.9;
      break;
    case 'USD':
      unit = '$';
      value *= 1.1;
      break;
  }

  if (showValue && !showSymbol) return value;

  if (!showValue && showSymbol) return unit;

  return unit + ' ' + value.toLocaleString();
};
export const unit_length = (
  value,
  unitFrom = 'm',
  showValue = true,
  showSymbol = true
) => {
  const length = config('unit_length');
  const unitExcluded = ['in', 'yd', 'ft-us', 'fathom', 'nMi'];
  let unit = '';
  let conversion = uc_length(value).from(unitFrom).to(length);

  switch (length) {
    case 'm':
      conversion = uc_length(conversion.value)
        .from(length)
        .toBest({ exclude: unitExcluded });

      break;
    case 'ft':
      conversion = uc_length(conversion.value)
        .from(length)
        .toBest({ exclude: unitExcluded });

      break;
  }

  value = conversion.value;
  unit = conversion.unit;

  if (showValue && !showSymbol) return value;

  if (!showValue && showSymbol) return unit;

  value = value.toFixed(1);

  return value.toLocaleString() + ' ' + unit;
};
export const unit_weight = (value, showValue = true, showSymbol = true) => {
  const weight = config('unit_weight');
  const unitExcluded = ['mcg', 'mg', 'mt', 'oz'];
  let unit = '';
  let conversion = uc_mass(value).from('kg').to(weight);

  switch (weight) {
    case 'kg':
      conversion = uc_mass(conversion.value)
        .from(weight)
        .toBest({ exclude: unitExcluded });

      value = conversion.value;
      unit = conversion.unit;

      if (value > 1000) {
        value /= 1000;
        unit = 't';
      }

      break;
    case 'lb':
      conversion = uc_mass(conversion.value)
        .from(weight)
        .toBest({ exclude: unitExcluded });

      value = conversion.value;
      unit = conversion.unit;

      break;
  }

  if (showValue && !showSymbol) return value;

  if (!showValue && showSymbol) return unit;

  return value.toFixed(1) + ' ' + unit;
};
export const unit_volume = (value, showValue = true, showSymbol = true) => {
  const unitDefined = config('unit_volume');
  let unit = '';
  let conversion = uc_volume(value).from('l').to(unitDefined);

  value = conversion.value;
  unit = conversion.unit;

  if (showValue && !showSymbol) return value;

  if (!showValue && showSymbol) return unit;

  return value.toFixed(0) + ' ' + unit;
};
export const unit_consumption = (
  value,
  showValue = true,
  showSymbol = true
) => {
  const unitDefined = config('unit_consumption');
  let conversion = null;
  let unit = '';

  value *= 100;

  switch (unitDefined) {
    case 'lpkm':
      conversion = {
        unit: 'L/100',
        value: value
      };

      break;
    case 'mpg':
      conversion = {
        unit: 'MPG',
        value: value === 0 ? 0 : 282.4809363 / value
      };

      break;
  }

  value = conversion.value;
  unit = conversion.unit;

  if (showValue && !showSymbol) return value;

  if (!showValue && showSymbol) return unit;

  value = value.toFixed(1);

  return value + ' ' + unit;
};
export const unit_pressure = (value, showValue = true, showSymbol = true) => {
  const unitDefined = config('unit_pressure');
  let unit = '';
  let conversion = uc_pressure(value).from('psi').to(unitDefined);

  value = conversion.value;
  unit = conversion.unit;

  if (showValue && !showSymbol) return value;

  if (!showValue && showSymbol) return unit;

  return value.toFixed(0) + ' ' + unit;
};
export const unit_degrees = (value, showValue = true, showSymbol = true) => {
  const unitDefined = config('unit_degrees');
  let unit = '';
  let conversion = uc_temperature(value).from('C').to(unitDefined);

  value = conversion.value;
  unit = '°' + conversion.unit;

  if (showValue && !showSymbol) return value;

  if (!showValue && showSymbol) return unit;

  return value.toFixed(0) + ' ' + unit;
};
/**
 * @deprecated
 */
export const $pressureToBar = (inPressure, unit = 'bar') => {
  let pressure;

  switch (unit) {
    case 'bar':
      pressure = inPressure * 0.0689476;
      break;

    default:
      pressure = inPressure;
      break;
  }

  return pressure;
};

export const $unitReadable = (unit, from = null, value = 1) => {
  switch (unit) {
    case 'unit_speed':
      return unit_speed(value, false, true);
    case 'unit_degrees':
      return unit_degrees(value, false, true);
    case 'unit_length':
      return unit_length(value, from, false, true);
    case 'unit_consumption':
      return unit_consumption(value, false, true);
    case 'unit_pressure':
      return unit_pressure(value, false, true);
    case 'unit_currency':
      return unit_currency(value, false, true);
    case 'unit_volume':
      return unit_volume(value, false, true);
  }
};

export const $convertToUnit = (value, unit, from = null) => {
  switch (unit) {
    case 'unit_speed':
      return unit_speed(value, true, false);
    case 'unit_degrees':
      return unit_degrees(value, true, false);
    case 'unit_length':
      return unit_length(value, from, true, false);
    case 'unit_consumption':
      return unit_consumption(value, true, false);
    case 'unit_pressure':
      return unit_pressure(value, true, false);
    case 'unit_currency':
      return unit_currency(value, true, false);
    case 'unit_volume':
      return unit_volume(value, true, false);
  }
};
