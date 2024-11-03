import { Factory } from '../../src/decorators/Factory';
import { Module } from '../../src/decorators/Module';
import { DIContainer } from '../../src/DIContainer';

it('should register components created by a factory', () => {
  class A {}

  @Module()
  class M {

    @Factory()
    public createA(): A {
      return new A();
    }
  }

  const container = new DIContainer();
  container.register(M, M);
  expect(container.resolve(A)).toBeInstanceOf(A);
});
