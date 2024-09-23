import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';

it('should resolve tag provided in component meta', () => {
  const tagA = Symbol();
  const tagB = Symbol();

  @Component({ tags: [tagA, tagB] })
  class A {}

  const container = new DIContainer();
  container.register(A);
  expect(container.resolveByTag(tagA)).toEqual([expect.any(A)]);
  expect(container.resolveByTag(tagB)).toEqual([expect.any(A)]);
});
