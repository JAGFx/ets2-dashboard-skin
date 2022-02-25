import { $gearInfo } from '@/utils/telemetry/_grear.utils';

describe('Telemetry gear utils', () => {
  const generateTransmissionData = (gear) => {
    return { gear: { displayed: gear } };
  };

  describe('$gearInfo', () => {
    test.each(['Toto', 'Mercedes'])(
      'The crawling gear should not exist for unsupported brand truck',
      (brandName) => {
        const gearDisplayed = 5;
        const transmission = generateTransmissionData(gearDisplayed);
        const result = $gearInfo(transmission, { name: brandName });

        expect(result).toEqual({
          gear: gearDisplayed,
          crawlingGear: 0
        });
      }
    );

    test.each(['Volvo', 'Scania', 'Kenworth'])('tes', (brandName) => {
      const gearDisplayed = 5;
      const transmission = generateTransmissionData(gearDisplayed);
      const result = $gearInfo(transmission, { name: brandName });

      expect(result).toEqual({
        gear: gearDisplayed,
        crawlingGear: 2
      });
    });
  });
});
