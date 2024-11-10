import { isConstructor } from './isConstructor';

describe('isConstructor', () => {
  it('should return true if value is a custom constructor', () => {
    class A {}
    expect(isConstructor(A)).toBe(true);
  });

  it('should return false if value is a primitive', () => {
    expect(isConstructor(1)).toBe(false);
    expect(isConstructor(true)).toBe(false);
    expect(isConstructor('test')).toBe(false);
    expect(isConstructor(Symbol())).toBe(false);
  });

  it('should return false if value is a built in class', () => {
    expect(isConstructor(String)).toBe(false);
  });

  it('should return false if value is an array', () => {
    expect(isConstructor([])).toBe(false);
  });
});
