import { DIContainer } from '../../src/DIContainer';
import { Component } from '../../src/decorators/Component';
import { ResolveAll } from '../../src/decorators/ResolveAll';

it('should resolve a constructor parameter with an array if @ResolveAll is used', () => {
  abstract class I {}

  @Component()
  class I1 extends I {}

  @Component()
  class I2 extends I {}

  const spy = jest.fn();

  @Component()
  class B {
    public constructor(@ResolveAll(I) i: I[]) {
      spy(i);
    }
  }

  const container = new DIContainer();
  container.register(I, I1);
  container.register(I, I2);
  container.register(B, B);
  expect(spy).toHaveBeenCalledWith(expect.arrayContaining([expect.any(I), expect.any(I)]));
});
