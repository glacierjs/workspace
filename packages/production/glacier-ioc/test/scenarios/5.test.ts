import { DIContainer } from '../../src/DIContainer';

it('should return undefined if given target is not registered', () => {
  class A {}
  const container = new DIContainer();
  const instance = container.resolve(A);
  expect(instance).toBeUndefined();
});
