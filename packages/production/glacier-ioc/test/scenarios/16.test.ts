import { globalContext } from '@glacier/context';

import { DIContainer } from '../../src/DIContainer';
import { Factory } from '../../src/decorators/Factory';
import { Module } from '../../src/decorators/Module';
import { Scope } from '../../src/interfaces/Scope';

it('should return a new instance for every new request scope when scope is SCOPED and created by a factory', () => {
  class A {}

  @Module()
  class M {
    @Factory({ scope: Scope.SCOPED })
    public createA(): A {
      return new A();
    }
  }

  const container = new DIContainer();
  container.register(M, M);

  const instanceA = container.resolve(A);
  expect(instanceA).toBeInstanceOf(A);
  expect(container.resolve(A)).toBe(instanceA);

  function scopeA() {
    const instanceB = container.resolve(A);
    expect(instanceB).toBeInstanceOf(A);
    expect(instanceA).not.toBe(instanceB);
    expect(container.resolve(A)).toBe(instanceB);
  }

  function scopeB() {
    const instanceC = container.resolve(A);
    expect(instanceC).toBeInstanceOf(A);
    expect(instanceA).not.toBe(instanceC);
    expect(container.resolve(A)).toBe(instanceC);
  }

  globalContext.run(scopeA);
  globalContext.run(scopeB);
});
