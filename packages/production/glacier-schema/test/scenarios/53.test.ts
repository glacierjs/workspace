import { Validator } from '../../src/Validator';
import { RecordProperty } from '../../src/decorators/RecordProperty';

it('should invalidate a record with max 2 properties', () => {
  class A {
    @RecordProperty({ key: { type: 'string' }, value: { type: 'integer' }, maxProperties: 2 })
    public declare a: Record<string, number>;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: { a: 1, b: 2, c: 3 } } as any);
  expect(result.isValid).toBe(false);
});
