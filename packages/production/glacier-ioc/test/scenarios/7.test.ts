import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';
import { Module } from '../../src/decorators/Module';

it('should register imported components by a module', () => {
  @Component()
  class A {}

  @Component()
  class B {}

  @Module({
    imports: [A, B]
  })
  class M {}

  const container = new DIContainer();
  container.register(M, M);
  expect(container.resolve(A)).toBeInstanceOf(A);
  expect(container.resolve(B)).toBeInstanceOf(B);
  expect(container.resolve(M)).toBeInstanceOf(M);
});
