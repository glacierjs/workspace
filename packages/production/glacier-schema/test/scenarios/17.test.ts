import { Validator } from '../../src/Validator';
import { IntegerProperty } from '../../src/decorators/IntegerProperty';

it('should invalidate an integer value that has a different type', () => {
  class A {
    @IntegerProperty()
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 'test' } as any);
  expect(result.isValid).toBe(false);
});
