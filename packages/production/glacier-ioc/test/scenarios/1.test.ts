import { DIContainer } from '../../src/DIContainer';

it('should throw an error if a class is registered that is not decorated', () => {
  class A {}
  const container = new DIContainer();
  expect(() => {
    container.register(A, A);
  }).toThrow();
});
