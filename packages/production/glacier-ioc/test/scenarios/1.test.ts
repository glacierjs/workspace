import { DIContainer } from '../../src/DIContainer';

it('should resolve a class by its constructor', () => {
  class Test {}
  const container = new DIContainer();
  container.register(Test);
  const instance = container.resolve(Test);
  expect(instance).toBeInstanceOf(Test);
});
