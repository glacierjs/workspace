import { Validator } from '../../src/Validator';
import type { ValidationSuccessResult } from '../../src/interfaces/ValidationSuccessResult';

it('should remove any top level properties that are unknown', () => {
  class A {
    public declare a: string;
    public declare b: string;
    public declare c: string;
  }

  const validator = new Validator();
  const result = validator.parse(A, { a: '1', b: '2', c: '2' });
  expect(result.isValid).toBe(true);
  expect((result as ValidationSuccessResult<A>).value).toBeInstanceOf(A);
  expect((result as ValidationSuccessResult<A>).value).toEqual({});
});
