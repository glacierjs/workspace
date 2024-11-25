import { Validator } from '../../src/Validator';
import { UnionProperty } from '../../src/decorators/UnionProperty';

it('should validate a union with no discriminator', () => {
  class A {
    @UnionProperty({ items: [{ type: 'boolean' }, { type: 'integer' }] })
    public declare a: boolean | number;
  }
  const validator = new Validator();
  expect(validator.parse(A, { a: 3 }).isValid).toBe(true);
  expect(validator.parse(A, { a: true }).isValid).toBe(true);
});
