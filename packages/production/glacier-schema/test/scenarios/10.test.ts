import { Validator } from '../../src/Validator';
import { EnumProperty } from '../../src/decorators/EnumProperty';

it('should invalidate an enum value that has a different type', () => {
  enum T {
    A = 'a'
  }

  class A {
    @EnumProperty(T)
    public declare a: T;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(false);
});
