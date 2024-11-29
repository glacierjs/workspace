import { Validator } from '../../src/Validator';
import { UnknownProperty } from '../../src/decorators/UnknownProperty';

it('should add all issue paths if no union type matches', () => {
  class A {
    @UnknownProperty()
    public declare a: unknown;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 'tet' } as any);
  expect(result.isValid).toBe(true);
});
