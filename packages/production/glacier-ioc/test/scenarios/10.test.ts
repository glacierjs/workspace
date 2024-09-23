import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';
import { Scope } from '../../src/interfaces/Scope';

it('should resolve transient constructor dependency', () => {
  @Component({ scope: Scope.TRANSIENT })
  class A {}

  @Component({ scope: Scope.TRANSIENT })
  class B {
    public constructor(public a: A) {}
  }

  const container = new DIContainer();
  container.register(A);
  container.register(B);
  const b = container.resolve(B);
  expect(b.a).toBeInstanceOf(A);
});
