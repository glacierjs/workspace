import { Validator } from '../../src/Validator';
import { NumberProperty } from '../../src/decorators/NumberProperty';

it('should validate a floating value', () => {
  class A {
    @NumberProperty()
    public declare a: number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3.3 } as any);
  expect(result.isValid).toBe(true);
});
