import { Validator } from '../../src/Validator';
import { IntegerProperty } from '../../src/decorators/IntegerProperty';

it('should invalidate an integer value that has a different precision', () => {
  class A {
    @IntegerProperty()
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3.3 } as any);
  expect(result.isValid).toBe(false);
});
