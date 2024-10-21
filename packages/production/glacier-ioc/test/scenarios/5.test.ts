import { DIContainer } from '../../src/DIContainer';
import { TagNotRegistered } from '../../src/exceptions/TagNotRegistered';

it('should return an empty array if tag is not defined', () => {
  const test = Symbol();
  const container = new DIContainer();
  const instances = container.resolveByTag(test);
  expect(instances.length).toBe(0);
});
