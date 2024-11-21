import { Validator } from '../../src/Validator';
import { ObjectProperty } from '../../src/decorators/ObjectProperty';
import { ValidationSuccessResult } from '../../src/interfaces/ValidationSuccessResult';

it('should recursively remove properties that are unknown', () => {
  class D {
    public declare e: string;
  }

  class B {
    public declare a: string;

    @ObjectProperty(D)
    public declare b: D;
  }

  class A {
    public declare a: string;
    public declare b: string;
    public declare c: string;

    @ObjectProperty(B)
    public declare d: B;
  }

  const validator = new Validator();
  const result = validator.parse(A, { a: '1', b: '2', c: '3', d: { a: '4', b: { e: '5' } } });
  expect(result.isValid).toBe(true);
  expect((result as ValidationSuccessResult<A>).value).toBeInstanceOf(A);
  expect((result as ValidationSuccessResult<A>).value).toEqual({ d: { b: {} } });
});
