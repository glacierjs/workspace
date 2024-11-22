import { Validator } from '../../src/Validator';
import { TupleProperty } from '../../src/decorators/TupleProperty';

it('should invalidate a tuple where the value has an incorrect type', () => {
  class A {
    @TupleProperty([{ type: 'string' }, { type: 'number' }, { type: 'boolean' }])
    public declare a: [string, number, boolean];
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(false);
});