import { DIContainer } from '../../src/DIContainer';
import { TagNotRegistered } from '../../src/exceptions/TagNotRegistered';

it('should throw an error if tag is not registered', () => {
  const test = Symbol();
  const container = new DIContainer();
  expect(() => {
    container.resolveByTag(test);
  }).toThrow(TagNotRegistered);
});
