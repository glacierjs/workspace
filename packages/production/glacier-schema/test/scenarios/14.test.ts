import { Validator } from '../../src/Validator';
import { DateProperty } from '../../src/decorators/DateProperty';

it('should validate a date', () => {
  class A {
    @DateProperty()
    public declare a: Date;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: new Date() } as any);
  expect(result.isValid).toBe(true);
});
