import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';
import { Module } from '../../src/decorators/Module';

it('should resolve constructor dependency imported by module', () => {
  @Component()
  class A {}

  @Component()
  class B {
    public constructor(public a: A) {}
  }

  @Module({
    imports: [A, B]
  })
  class M {}

  const container = new DIContainer();
  container.register(M);
  const b = container.resolve(B);
  expect(b.a).toBeInstanceOf(A);
});
