import { Validator } from '../../src/Validator';
import { RecordProperty } from '../../src/decorators/RecordProperty';

it('should validate a record', () => {
  class A {
    @RecordProperty({ key: { type: 'string' }, value: { type: 'integer' } })
    public declare a: Record<string, number>;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: { a: 1, b: 2 } } as any);
  expect(result.isValid).toBe(true);
});
