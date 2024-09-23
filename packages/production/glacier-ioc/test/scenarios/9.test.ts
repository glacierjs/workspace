import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';

it('should resolve singleton constructor dependency', () => {
  @Component()
  class A {}

  @Component()
  class B {
    public constructor(public a: A) {}
  }

  const container = new DIContainer();
  container.register(A);
  container.register(B);
  const b = container.resolve(B);
  expect(b.a).toBeInstanceOf(A);
});
