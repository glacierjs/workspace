import { Validator } from '../../src/Validator';
import { LiteralProperty } from '../../src/decorators/LiteralProperty';

it('should validate a literal value', () => {
  class A {
    @LiteralProperty('X')
    public declare a: 'X';
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 'X' });
  expect(result.isValid).toBe(true);
});
