import { Validator } from '../../src/Validator';
import { IntegerProperty } from '../../src/decorators/IntegerProperty';

it('should validate an integer that is  a multipleOf 2', () => {
  class A {
    @IntegerProperty({ multipleOf: 2 })
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 4 } as any);
  expect(result.isValid).toBe(true);
});
