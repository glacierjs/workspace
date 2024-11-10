import { Context } from '../../src/Context';

it('should return undefined if getId is called without any context', () => {
  const context = new Context();
  expect(context.getId()).toBeUndefined();
});
