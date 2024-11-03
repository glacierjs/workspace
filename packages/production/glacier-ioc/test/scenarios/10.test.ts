import { Factory } from '../../src/decorators/Factory';
import { Module } from '../../src/decorators/Module';
import { DIContainer } from '../../src/DIContainer';

it('should ignore module methods that are not decorated with @Factory', () => {
  class A {}
  class B {}

  @Module()
  class M {

    @Factory()
    public createA(): A {
      return new A();
    }

    public createB(): B {
      return new B();
    }
  }

  const container = new DIContainer();
  container.register(M, M);
  expect(container.resolve(B)).toBeUndefined();
});
