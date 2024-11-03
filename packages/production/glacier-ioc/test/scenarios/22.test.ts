import { Component } from '../../src/decorators/Component';
import { DIContainer } from '../../src/DIContainer';
import { Resolve } from '../../src/decorators/Resolve';
import { ResolveOrThrow } from '../../src/decorators/ResolveOrThrow';

it('should resolve constructor parameter if @ResolveOrThrow is used', () => {

  @Component()
  class A {
  }

  const spy = jest.fn();

  @Component()
  class B {
    public constructor(@ResolveOrThrow(A) a: A) {
      spy(a);
    }
  }

  const container = new DIContainer();
  container.register(A, A);
  container.register(B, B);
  expect(spy).toHaveBeenCalledWith(expect.any(A));
});
