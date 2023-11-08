import { isNil } from './index';

describe('isNil', () => {
  test('true', () => {
    expect(isNil(undefined)).toBe(true);
    expect(isNil(null)).toBe(true);
  });

  test('false', () => {
    expect(isNil('')).toBe(false);
    expect(isNil([])).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil(25)).toBe(false);
    expect(isNil(() => undefined)).toBe(false);
    expect(isNil(Symbol('my symbol'))).toBe(false);
  });
});
