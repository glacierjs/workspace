import { Validator } from '../../src/Validator';
import type { ValidationFailedResult } from '../../src/interfaces/ValidationFailedResult';

it('should invalidate a primitive top level value', () => {
  class A {}
  const validator = new Validator();
  const result = validator.parse(A, 3);
  expect(result.isValid).toBe(false);
  expect((result as ValidationFailedResult).issues).toEqual([
    {
      message: 'Expected value to be of type object',
      path: '$',
      type: 'INVALID_TYPE'
    }
  ]);
});
