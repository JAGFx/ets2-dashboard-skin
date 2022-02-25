import { config } from '@/utils/telemetry/_common.utils';

export const $gearInfo = (transmission, brand) => {
  let gear = transmission.gear.displayed;
  let crawlingGear = 0;

  switch (brand.name) {
    case 'Volvo':
    case 'Scania':
    case 'Kenworth':
      crawlingGear = 2;
      break;
  }

  return { gear, crawlingGear };
};

export const $trukGear = (transmission, brand, withShifterType = true) => {
  const gear = $gearInfo(transmission, brand).gear;
  const crawlingGear = $gearInfo(transmission, brand).crawlingGear;
  const hShiftLayout = config('general_h-shift-layout');
  const rangeAndSplitterEnabled = hShiftLayout === 'h-shifter';
  let strGear = gear;

  if (transmission.shifterType === 'hshifter' && rangeAndSplitterEnabled) {
    let realGearCount = gear - crawlingGear;
    let spliter = realGearCount % 2 ? 'L' : 'H';
    let realGear = Math.ceil(realGearCount / 2);
    strGear = realGear + spliter;
  } else {
    strGear = gear - crawlingGear;
  }

  if (withShifterType) {
    if (
      transmission.shifterType === 'automatic' ||
      transmission.shifterType === 'arcade'
    )
      strGear = 'A' + (gear - crawlingGear);

    if (gear <= crawlingGear) strGear = 'C' + Math.abs(gear);

    if (gear === 0) strGear = 'N';

    if (gear < 0) strGear = 'R' + Math.abs(transmission.gear.displayed);
  }

  return strGear;
};

export const $truckShifterTypeLetter = (transmission, brand) => {
  const gear = $gearInfo(transmission, brand).gear;
  const crawlingGear = $gearInfo(transmission, brand).crawlingGear;
  let shifterType = 'D';

  if (
    transmission.shifterType === 'automatic' ||
    transmission.shifterType === 'arcade'
  )
    shifterType = 'A';

  if (gear <= crawlingGear) shifterType = 'C';

  if (gear === 0) shifterType = 'N';

  if (gear < 0) shifterType = 'R';

  return shifterType;
};
