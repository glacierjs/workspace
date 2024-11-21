import { Validator } from '../../src/Validator';
import { StringProperty } from '../../src/decorators/StringProperty';

it('should invalidate a string when the value is of a different type', () => {
  class A {
    @StringProperty()
    public declare a: string;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(false);
});
