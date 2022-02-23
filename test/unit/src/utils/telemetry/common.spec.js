import { $scale } from '@/utils/telemetry/_common.utils';

describe('Telemetry common utils', () => {
  test.each([
    {
      size: {
        width: 0,
        height: 720
      }
    },
    {
      size: {
        width: 1280,
        height: 0
      }
    },
    {
      size: {
        width: 0,
        height: 0
      }
    }
  ])(
    'Test $scale must return 1 without skin width or height',
    (currentSkin) => {
      global.innerWidth = 1920;
      global.innerHeight = 1080;

      expect($scale(currentSkin)).toBe(1);
    }
  );
});
