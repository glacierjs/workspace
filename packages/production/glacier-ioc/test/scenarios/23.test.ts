import { Component } from '../../src/decorators/Component';
import { DIContainer } from '../../src/DIContainer';
import { ResolveOrThrow } from '../../src/decorators/ResolveOrThrow';

it('should throw an error if constructor parameter is not registered and @ResolveOrThrow is used', () => {

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
  expect(() => {
  container.register(B, B);
  }).toThrow();
});
