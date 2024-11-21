import { Validator } from '../../src/Validator';
import { StringProperty } from '../../src/decorators/StringProperty';

it('should invalidate a string with pattern', () => {
  class A {
    @StringProperty({ pattern: /.-./ })
    public declare a: string;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 'a+b' } as any);
  expect(result.isValid).toBe(false);
});
