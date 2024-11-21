import { Validator } from '../../src/Validator';
import { StringProperty } from '../../src/decorators/StringProperty';
import { ValidationFailedResult } from '../../src/interfaces/ValidationFailedResult';

it('should invalidate a missing property', () => {
  class A {
    @StringProperty()
    public declare a: string;
  }
  const validator = new Validator();
  const result = validator.parse(A, {} as any);
  expect(result.isValid).toBe(false);
  expect((result as ValidationFailedResult).issues).toEqual([
    {
      message: 'Expected a to exist.',
      path: '$.a',
      type: 'REQUIRED_PROPERTY'
    }
  ]);
});
