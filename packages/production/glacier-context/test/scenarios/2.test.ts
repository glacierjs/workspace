import { Context } from '../../src/Context';

it('should execute a given function when called with run', () => {
  const context = new Context();
  const fn = jest.fn();
  context.run(fn);
  expect(fn).toHaveBeenCalledWith();
});
