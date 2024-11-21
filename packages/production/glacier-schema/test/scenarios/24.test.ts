import { Validator } from '../../src/Validator';
import { IntegerProperty } from '../../src/decorators/IntegerProperty';

it('should invalidate an integer that has an exclusive minimum of 3', () => {
  class A {
    @IntegerProperty({ exclusiveMinimum: 3 })
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(false);
});
