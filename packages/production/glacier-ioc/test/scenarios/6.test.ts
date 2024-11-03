import { DIContainer } from '../../src/DIContainer';

it('should throw an error if given target is not registered', () => {
  class A {
  }

  const container = new DIContainer();
  expect(() => {
    container.resolveOrThrow(A);
  }).toThrow();
});
