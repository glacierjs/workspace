import { Factory } from '../../src/decorators/Factory';
import { Module } from '../../src/decorators/Module';
import { DIContainer } from '../../src/DIContainer';

it('should register interfaces created by a factory', () => {
  class B {
  }

  class A {
  }

  @Module()
  class M {

    @Factory({ implements: [B] })
    public createA(): A {
      return new A();
    }
  }

  const container = new DIContainer();
  container.register(M, M);
  expect(container.resolve(B)).toBeInstanceOf(A);
});
