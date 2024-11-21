import { Validator } from '../../src/Validator';
import { TupleProperty } from '../../src/decorators/TupleProperty';

it('should validate a tuple', () => {
  class A {
    @TupleProperty([{ type: 'string' }, { type: 'number' }, { type: 'boolean' }])
    public declare a: [string, number, boolean];
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: ['a', 3, true] } as any);
  expect(result.isValid).toBe(true);
});
