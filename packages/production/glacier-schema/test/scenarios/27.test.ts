import { Validator } from '../../src/Validator';
import { IntegerProperty } from '../../src/decorators/IntegerProperty';

it('should validate an integer that has an minimum of 3', () => {
  class A {
    @IntegerProperty({ minimum: 3 })
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(true);
});
