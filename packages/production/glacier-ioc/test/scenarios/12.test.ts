import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';

it('should resolve multiple singleton constructor dependency', () => {
  @Component()
  class A {}

  @Component()
  class B {}

  @Component()
  class C {
    public constructor(
      public a: A,
      public b: B
    ) {}
  }

  const container = new DIContainer();
  container.register(A);
  container.register(B);
  container.register(C);
  const c = container.resolve(C);
  expect(c.a).toBeInstanceOf(A);
  expect(c.b).toBeInstanceOf(B);
});
