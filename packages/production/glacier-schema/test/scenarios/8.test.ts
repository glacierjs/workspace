import { Validator } from '../../src/Validator';
import { EnumProperty } from '../../src/decorators/EnumProperty';

it('should validate an enum value', () => {
  enum T {
    A = 'a'
  }

  class A {
    @EnumProperty(T)
    public declare a: T;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: T.A } as any);
  expect(result.isValid).toBe(true);
});
