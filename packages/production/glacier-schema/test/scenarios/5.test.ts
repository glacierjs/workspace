import { Validator } from '../../src/Validator';
import { StringProperty } from '../../src/decorators/StringProperty';

it('should allow optional properties', () => {
  class A {
    @StringProperty({ isOptional: true })
    public declare a?: string;
  }
  const validator = new Validator();
  const result = validator.parse(A, {});
  expect(result.isValid).toBe(true);
});
