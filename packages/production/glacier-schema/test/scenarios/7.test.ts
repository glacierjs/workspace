import { Validator } from '../../src/Validator';
import { LiteralProperty } from '../../src/decorators/LiteralProperty';

it('should invalidate a literal value', () => {
  class A {
    @LiteralProperty('X')
    public declare a: 'X';
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 'Y' } as any);
  expect(result.isValid).toBe(false);
});
