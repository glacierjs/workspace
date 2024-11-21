import { Validator } from '../../src/Validator';
import { IntegerProperty } from '../../src/decorators/IntegerProperty';

it('should validate an integer that has a exclusive maximum of 3', () => {
  class A {
    @IntegerProperty({ exclusiveMaximum: 3 })
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 2 } as any);
  expect(result.isValid).toBe(true);
});
