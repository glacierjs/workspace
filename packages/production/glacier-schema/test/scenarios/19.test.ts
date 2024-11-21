import { Validator } from '../../src/Validator';
import { IntegerProperty } from '../../src/decorators/IntegerProperty';

it('should invalidate an integer that is not a multipleOf 2', () => {
  class A {
    @IntegerProperty({ multipleOf: 2 })
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(false);
});
