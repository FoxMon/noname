import { isString } from './isString';

describe('isString', () => {
  test('Returns true', () => {
    expect(isString('So lovely HoBom')).toBe(true);
    expect(isString([])).toBe(false);
    expect(isString(123)).toBe(false);
    expect(isString({})).toBe(false);
    expect(
      isString({
        korea: {
          seoul: {
            house: '너무 비싸.',
          },
        },
      }),
    ).toBe(false);
  });
});
