import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';
import { Inject } from '../../src/decorators/Inject';

it('should resolve tag constructor dependency', () => {
  const tag = Symbol();

  @Component()
  class A {}

  @Component()
  class B {
    public constructor(@Inject(tag) public a: A[]) {}
  }

  const container = new DIContainer();
  container.registerTag(tag, A);
  container.register(B);
  const b = container.resolve(B);
  expect(b.a).toEqual([expect.any(A)]);
});
