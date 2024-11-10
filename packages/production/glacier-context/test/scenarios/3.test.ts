import { Context } from '../../src/Context';

it('should return undefined when getContext is called without any context', () => {
  const context = new Context();
  expect(context.getContext()).toBeUndefined();
});
