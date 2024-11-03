import { Component } from '../../src/decorators/Component';
import { DIContainer } from '../../src/DIContainer';
import { Resolve } from '../../src/decorators/Resolve';

it('should resolve constructor parameter with undefined if @Resolve is used', () => {

  @Component()
  class A {
  }

  const spy = jest.fn();

  @Component()
  class B {
    public constructor(@Resolve(A) a?: A) {
      spy(a);
    }
  }

  const container = new DIContainer();
  container.register(B, B);
  expect(spy).toHaveBeenCalledWith(undefined);
});
