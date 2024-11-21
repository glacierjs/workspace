import { NumberProperty } from '../../src/decorators/NumberProperty';

it('should throw an error if Property decorator is used for a symbol property', () => {
  const T = Symbol();

  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class A {
      @NumberProperty()
      public declare [T]: number;
    }
  }).toThrow();
});
