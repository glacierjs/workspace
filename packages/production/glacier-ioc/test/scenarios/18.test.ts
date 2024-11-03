import { Component } from '../../src/decorators/Component';
import { DIContainer } from '../../src/DIContainer';

it('should resolve a constructor parameter', () => {

  @Component()
  class A {
  }

  const spy = jest.fn();

  @Component()
  class B {
    public constructor(a: A) {
      spy(a);
    }
  }

  const container = new DIContainer();
  container.register(A, A);
  container.register(B, B);
  expect(spy).toHaveBeenCalledWith(expect.any(A));
});
