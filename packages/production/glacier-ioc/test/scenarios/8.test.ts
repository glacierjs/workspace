import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';
import { Scope } from '../../src/interfaces/Scope';

it('should return new instances per open scope', () => {
  @Component({ scope: Scope.SCOPED })
  class Test {}
  const container = new DIContainer();
  container.register(Test);

  container.createScope(() => {
    const instanceA = container.resolve(Test);
    const instanceB = container.resolve(Test);

    let scopeA, scopeB;
    container.createScope(() => {
      scopeA = container.resolve(Test);
      expect(scopeA).not.toBe(instanceA);
      expect(scopeA).toBe(container.resolve(Test));
    });

    container.createScope(() => {
      scopeB = container.resolve(Test);
      expect(scopeB).not.toBe(instanceA);
      expect(scopeB).toBe(container.resolve(Test));
    });

    expect(instanceA).toBe(instanceB);
  });
});
