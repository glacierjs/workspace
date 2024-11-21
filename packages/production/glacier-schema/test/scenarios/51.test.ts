import { Validator } from '../../src/Validator';
import { RecordProperty } from '../../src/decorators/RecordProperty';

it('should invalidate a record if value has an incorrect type', () => {
  class A {
    @RecordProperty({ key: { type: 'string' }, value: { type: 'integer' } })
    public declare a: Record<string, number>;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(false);
});
