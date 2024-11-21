import { Validator } from '../../src/Validator';
import { BooleanProperty } from '../../src/decorators/BooleanProperty';

it('should invalidate an boolean value', () => {
  class A {
    @BooleanProperty()
    public declare a: boolean;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(false);
});
