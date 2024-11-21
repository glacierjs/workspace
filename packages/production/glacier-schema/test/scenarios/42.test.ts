import { Validator } from '../../src/Validator';
import { ArrayProperty } from '../../src/decorators/ArrayProperty';

it('should invalidate an array if value has an incorrect type', () => {
  class A {
    @ArrayProperty({ type: 'string' })
    public declare a: string[];
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(false);
});
