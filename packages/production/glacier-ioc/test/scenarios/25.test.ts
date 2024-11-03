import { Component } from '../../src/decorators/Component';
import { DIContainer } from '../../src/DIContainer';

it('should throw an error if constructor parameter is a primitive value', () => {


  @Component()
  class B {
    public constructor(name: string) {
    }
  }

  const container = new DIContainer();
  expect(() => {
    container.register(B, B);
  }).toThrow();
});
