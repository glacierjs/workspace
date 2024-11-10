import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';
import { Scope } from '../../src/interfaces/Scope';

it('should return a new instance for every resolution when scope is TRANSIENT', () => {
  @Component({ scope: Scope.TRANSIENT })
  class A {}

  const container = new DIContainer();
  container.register(A, A);
  const instanceA = container.resolve(A);
  const instanceB = container.resolve(A);
  expect(instanceA).not.toBe(instanceB);
});
