import { Context } from '../../src/Context';

it('should return an id when getId is run inside a context', () => {
  const context = new Context();
  context.run(() => {
    expect(context.getId()).toEqual(expect.any(String));
  });
});
