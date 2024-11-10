import { Context } from '../../src/Context';

it('should return a symbol when getContext is run inside a context', () => {
  const context = new Context();
  context.run(() => {
    expect(context.getContext()).toEqual(expect.any(Symbol));
  });
});
