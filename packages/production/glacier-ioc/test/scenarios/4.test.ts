import { DIContainer } from '../../src/DIContainer';

it('should resolve a class by a symbol', () => {
  const test = Symbol();
  class Test {}
  const container = new DIContainer();
  container.registerTag(test, Test);
  const [instance] = container.resolveByTag(test);
  expect(instance).toBeInstanceOf(Test);
});
