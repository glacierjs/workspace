import { Component } from "../../src/decorators/Component";
import { DIContainer } from "../../src/DIContainer";

it('should resolve a list of instances', () => {
  abstract class I {}

  @Component()
  class A {}

  @Component()
  class B {}

  const container = new DIContainer();
  container.register(I, A);
  container.register(I, B);

  const instance = container.resolveAll(I);
  expect(instance).toEqual([expect.any(A), expect.any(B)]);
});
