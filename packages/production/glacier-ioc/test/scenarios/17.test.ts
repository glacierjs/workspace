import { DIContainer } from '../../src/DIContainer';
import { Factory } from '../../src/decorators/Factory';
import { Module } from '../../src/decorators/Module';

it('should resolve constructor dependency imported by module', () => {
  class A {
    public constructor(public readonly test: string) {}
  }

  @Module()
  class M {
    @Factory()
    public createA(): A {
      return new A('{{TEST}}');
    }
  }

  const container = new DIContainer();
  container.register(M);
  const a = container.resolve(A);
  expect(a).toBeInstanceOf(A);
  expect(a.test).toBe('{{TEST}}');
});
