import { $scale } from '@/utils/telemetry/_common.utils';

describe('Telemetry common utils', () => {
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
    expect($scale(currentSkin)).toBeLessThan(1);
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
    expect($scale(currentSkin)).toBeGreaterThanOrEqual(1);
  });
});
