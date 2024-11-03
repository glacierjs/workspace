import { Component } from "../../src/decorators/Component";
import { DIContainer } from "../../src/DIContainer";

it('should throw an error if multiple instances are defined', () => {
  abstract class I {}

  @Component()
  class A {}

  @Component()
  class B {}

  const container = new DIContainer();
  container.register(I, A);
  container.register(I, B);

  expect(() => {
    container.resolve(I);
  }).toThrow();
});
