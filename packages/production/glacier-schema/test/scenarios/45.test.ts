import { Validator } from '../../src/Validator';
import { ArrayProperty } from '../../src/decorators/ArrayProperty';

it('should invalidate an array with unique items', () => {
  class A {
    @ArrayProperty({ type: 'string' }, { uniqueItems: true })
    public declare a: string[];
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: ['A', 'A'] } as any);
  expect(result.isValid).toBe(false);
});
