import { Validator } from '../../src/Validator';
import { CyclicProperty } from '../../src/decorators/CyclicProperty';

it('should validate cyclic dependencies', () => {
  class A {
    @CyclicProperty(() => ({ type: 'object', schema: A }), true)
    public declare a?: A;
  }

  const validator = new Validator();
  const result = validator.parse(A, { a: { a: { a: {} } } } as any);
  expect(result.isValid).toBe(true);
});
