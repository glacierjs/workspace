import { Validator } from '../../src/Validator';
import { NumberProperty } from '../../src/decorators/NumberProperty';

it('should invalidate a floating value', () => {
  class A {
    @NumberProperty()
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 't' } as any);
  expect(result.isValid).toBe(false);
});
