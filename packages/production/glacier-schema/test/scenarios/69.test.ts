import { Validator } from '../../src/Validator';
import { UnionProperty } from '../../src/decorators/UnionProperty';
import type { ValidationFailedResult } from '../../src/interfaces/ValidationFailedResult';

it('should add all issue paths if no union type matches', () => {
  class A {
    @UnionProperty({ items: [{ type: 'boolean' }, { type: 'integer' }] })
    public declare a: boolean | number;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 'tet' } as any);
  expect((result as ValidationFailedResult).issues).toEqual([
    {
      message: 'Expected value to be of type boolean',
      path: '$.a',
      type: 'INVALID_TYPE'
    },
    {
      message: 'Expected value to be of type number',
      path: '$.a',
      type: 'INVALID_TYPE'
    },
    {
      message: 'Expected value to be on of the possible union items',
      path: '$.a',
      type: 'INVALID_UNION'
    }
  ]);
});
