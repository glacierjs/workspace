import { Validator } from '../../src/Validator';
import { ArrayProperty } from '../../src/decorators/ArrayProperty';

it('should validate an array with minimal 2 items', () => {
  class A {
    @ArrayProperty({ type: 'string' }, { minItems: 2 })
    public declare a: string[];
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: ['A', 'A'] } as any);
  expect(result.isValid).toBe(true);
});
