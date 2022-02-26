import { config } from '@/utils/telemetry/_common.utils';

export const crawlingGearCount = (brandName) => {
  let crawlingGear = 0;

  switch (brandName) {
    case 'Volvo':
    case 'Scania':
    case 'Kenworth':
      crawlingGear = 2;
      break;
  }

  return crawlingGear;
};

export const truckGear = (
  gear,
  shifterType,
  brandName,
  withShifterType = true
) => {
  const crawlingGear = crawlingGearCount(brandName);
  const hShiftLayout = config('general_h-shift-layout');
  const rangeAndSplitterEnabled = hShiftLayout === 'h-shifter';
  let strGear = gear;

  if (shifterType === 'hshifter' && rangeAndSplitterEnabled) {
    let realGearCount = gear - crawlingGear;
    let splitter = realGearCount % 2 ? 'L' : 'H';
    let realGear = Math.ceil(realGearCount / 2);
    strGear = realGear + splitter;
  } else {
    strGear = gear - crawlingGear;
  }

  if (
    (shifterType === 'automatic' || shifterType === 'arcade') &&
    withShifterType
  )
    strGear = 'A' + (gear - crawlingGear);

  if (gear <= crawlingGear) strGear = 'C' + Math.abs(gear);

  if (gear === 0) strGear = 'N';

  if (gear < 0) strGear = 'R' + Math.abs(gear);

  return strGear;
};

export const truckShifterTypeLetter = (shifterType) => {
  if (shifterType === 'automatic' || shifterType === 'arcade') return 'A';
  else return 'M';
};
