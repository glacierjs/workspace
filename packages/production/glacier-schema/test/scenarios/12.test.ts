import { Validator } from '../../src/Validator';
import { BooleanProperty } from '../../src/decorators/BooleanProperty';

it('should validate an boolean value that is false', () => {
  class A {
    @BooleanProperty()
    public declare a: boolean;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: false } as any);
  expect(result.isValid).toBe(true);
});
