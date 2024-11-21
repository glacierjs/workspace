import { Validator } from '../../src/Validator';
import { StringProperty } from '../../src/decorators/StringProperty';

it('should validate a string', () => {
  class A {
    @StringProperty()
    public declare a: string;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 't' } as any);
  expect(result.isValid).toBe(true);
});
