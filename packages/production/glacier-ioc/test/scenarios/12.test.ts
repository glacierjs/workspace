import { DIContainer } from '../../src/DIContainer';
import { Factory } from '../../src/decorators/Factory';
import { Module } from '../../src/decorators/Module';
import { Scope } from '../../src/interfaces/Scope';

it('should call factory function multiple times for a transient scope', () => {
  class A {}

  @Module()
  class M {
    @Factory({ scope: Scope.TRANSIENT })
    public createA(): A {
      return new A();
    }
  }

  const container = new DIContainer();
  const spy = jest.spyOn(M.prototype, 'createA');
  expect(spy).toHaveBeenCalledTimes(0);
  container.register(M, M);
  expect(spy).toHaveBeenCalledTimes(0);
  expect(container.resolve(A)).toBeInstanceOf(A);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(container.resolve(A)).toBeInstanceOf(A);
  expect(spy).toHaveBeenCalledTimes(2);
});
