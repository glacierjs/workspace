import { Validator } from '../../src/Validator';
import { LiteralProperty } from '../../src/decorators/LiteralProperty';

it('should throw an error if object is not valid', () => {
  class A {
    @LiteralProperty('X')
    public declare a: 'X';
  }
  const validator = new Validator();
  expect(() => {
    validator.parseOrThrow(A, { a: 'Y' } as any);
  }).toThrow();
});
