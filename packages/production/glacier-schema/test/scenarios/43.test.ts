import { Validator } from '../../src/Validator';
import { ArrayProperty } from '../../src/decorators/ArrayProperty';

it('should invalidate an array with incorrect items', () => {
  class A {
    @ArrayProperty({ type: 'string' })
    public declare a: string[];
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: ['A', 3] } as any);
  expect(result.isValid).toBe(false);
});
