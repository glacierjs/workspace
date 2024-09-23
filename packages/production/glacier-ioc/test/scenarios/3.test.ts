import { DIContainer } from '../../src/DIContainer';

it('should return the same instance of the constructor by default', () => {
  class Test {}
  const container = new DIContainer();
  container.register(Test);
  const instanceA = container.resolve(Test);
  const instanceB = container.resolve(Test);
  expect(instanceA).toBe(instanceB);
});
