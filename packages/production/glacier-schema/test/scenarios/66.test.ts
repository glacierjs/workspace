import { Validator } from '../../src/Validator';
import { LiteralProperty } from '../../src/decorators/LiteralProperty';

it('should not throw an error if object is valid', () => {
  class A {
    @LiteralProperty('X')
    public declare a: 'X';
  }
  const validator = new Validator();
  const result = validator.parseOrThrow(A, { a: 'X' });
  expect(result).toBeInstanceOf(A);
});
