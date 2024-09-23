import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';

it('should resolve nested singleton constructor dependency', () => {
  @Component()
  class A {}

  @Component()
  class B {
    public constructor(public a: A) {}
  }

  @Component()
  class C {
    public constructor(public b: B) {}
  }

  const container = new DIContainer();
  container.register(A);
  container.register(B);
  container.register(C);
  const c = container.resolve(C);
  expect(c.b).toBeInstanceOf(B);
  expect(c.b.a).toBeInstanceOf(A);
});
