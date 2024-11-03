import { Component } from "../../src/decorators/Component";
import { DIContainer } from "../../src/DIContainer";

it('should return the same instance for every resolution by default', () => {
  @Component()
  class A {}
  const container = new DIContainer();
  container.register(A, A);
  const instanceA = container.resolve(A);
  const instanceB = container.resolve(A);
  expect(instanceA).toBe(instanceB);
});
