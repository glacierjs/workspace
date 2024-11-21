import { Validator } from '../../src/Validator';
import { IntegerProperty } from '../../src/decorators/IntegerProperty';

it('should validate an integer that has an maximum of 3', () => {
  class A {
    @IntegerProperty({ maximum: 3 })
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(true);
});
