import { Validator } from '../../src/Validator';
import { UnionProperty } from '../../src/decorators/UnionProperty';

it('should invalidate a union with no discriminator', () => {
  class A {
    @UnionProperty({ items: [{ type: 'boolean' }, { type: 'integer' }] })
    public declare a: boolean | number;
  }
  const validator = new Validator();
  expect(validator.parse(A, { a: 'tet' } as any).isValid).toBe(false);
});
