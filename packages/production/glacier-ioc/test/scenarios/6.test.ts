import { DIContainer } from '../../src/DIContainer';

it('should return multiple instances when tagged with the same tag', () => {
  const test = Symbol();
  class TestA {}
  class TestB {}
  const container = new DIContainer();
  container.registerTag(test, TestA);
  container.registerTag(test, TestB);
  const [a, b] = container.resolveByTag(test);
  expect(a).toBeInstanceOf(TestA);
  expect(b).toBeInstanceOf(TestB);
});
