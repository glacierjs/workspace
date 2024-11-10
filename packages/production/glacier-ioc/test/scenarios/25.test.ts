import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';

it('should throw an error if constructor parameter is a primitive value', () => {
  @Component()
  class B {
    public constructor(private readonly name: string) {}
  }

  const container = new DIContainer();
  expect(() => {
    container.register(B, B);
  }).toThrow();
});
