import { compareArray } from './compareArray';

describe('compareArray', () => {
  it('should return true if arrays are equal', () => {
    expect(compareArray([1, 2, 3], [1, 2, 3])).toEqual(true);
  });

  it('should return false if arrays have different lengths', () => {
    expect(compareArray([1], [1, 2])).toBe(false);
  });

  it('should return false if array items are different', () => {
    expect(compareArray([2, 1], [1, 2])).toBe(false);
  });
});
