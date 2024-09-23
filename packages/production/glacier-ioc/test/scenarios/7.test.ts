import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';
import { Scope } from '../../src/interfaces/Scope';

it('should return the new instances of the constructor when scope is set to transient', () => {
  @Component({ scope: Scope.TRANSIENT })
  class Test {}
  const container = new DIContainer();
  container.register(Test);
  const instanceA = container.resolve(Test);
  const instanceB = container.resolve(Test);
  expect(instanceA).not.toBe(instanceB);
});
