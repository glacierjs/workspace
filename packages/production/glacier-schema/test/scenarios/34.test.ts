import { Validator } from '../../src/Validator';
import { StringProperty } from '../../src/decorators/StringProperty';

it('should validate a string with minLength of 3', () => {
  class A {
    @StringProperty({ minLength: 3 })
    public declare a: string;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: '123' } as any);
  expect(result.isValid).toBe(true);
});
