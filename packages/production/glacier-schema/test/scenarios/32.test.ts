import { Validator } from '../../src/Validator';
import { StringProperty } from '../../src/decorators/StringProperty';

it('should invalidate a string with maxLength of 3', () => {
  class A {
    @StringProperty({ maxLength: 3 })
    public declare a: string;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: '1234' } as any);
  expect(result.isValid).toBe(false);
});
