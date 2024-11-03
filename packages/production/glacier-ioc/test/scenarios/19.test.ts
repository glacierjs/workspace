import { Component } from '../../src/decorators/Component';
import { DIContainer } from '../../src/DIContainer';

it('should throw an error if constructor parameter is not registered', () => {

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

  expect(() => {
    container.register(B, B);
  }).toThrow();
});
