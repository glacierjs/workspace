import { Validator } from '../../src/Validator';
import { IntegerProperty } from '../../src/decorators/IntegerProperty';

it('should invalidate an integer that has an minimum of 3', () => {
  class A {
    @IntegerProperty({ minimum: 3 })
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 2 } as any);
  expect(result.isValid).toBe(false);
});
