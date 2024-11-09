import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';

it('should resolve all instances that implements a given class', () => {
  abstract class A {}

  @Component({ implements: [A] })
  class B {}

  const container = new DIContainer();
  container.register(B, B);
  expect(container.resolve(A)).toBeInstanceOf(B);
  expect(container.resolveAll(A)).toEqual([expect.any(B)]);
});
