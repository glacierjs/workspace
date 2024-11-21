import { Validator } from '../../src/Validator';
import { BooleanProperty } from '../../src/decorators/BooleanProperty';

it('should validate an boolean value that is true', () => {
  class A {
    @BooleanProperty()
    public declare a: boolean;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: true } as any);
  expect(result.isValid).toBe(true);
});
