import { Factory } from '../../src/decorators/Factory';
import { Module } from '../../src/decorators/Module';
import { DIContainer } from '../../src/DIContainer';
import { Scope } from '../../src/interfaces/Scope';

it('should call factory function once for a singleton scope', () => {
  class A {
  }

  @Module()
  class M {
    @Factory({ scope: Scope.SINGLETON })
    public createA(): A {
      return new A();
    }
  }

  const container = new DIContainer();
  const spy = jest.spyOn(M.prototype, 'createA');
  expect(spy).toHaveBeenCalledTimes(0);
  container.register(M, M);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(container.resolve(A)).toBeInstanceOf(A);
  expect(spy).toHaveBeenCalledTimes(1);
});
