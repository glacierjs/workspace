import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';

it('should resolve a class by its constructor', () => {
  @Component()
  class A {}
  const container = new DIContainer();
  container.register(A, A);
  const instance = container.resolve(A);
  expect(instance).toBeInstanceOf(A);
});
