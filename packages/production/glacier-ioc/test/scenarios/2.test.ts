import { DIContainer } from '../../src/DIContainer';
import { InstanceNotRegistered } from '../../src/exceptions/InstanceNotRegistered';

it('should throw an error if instance is not registered', () => {
  class Test {}
  const container = new DIContainer();
  expect(() => {
    container.resolve(Test);
  }).toThrow(InstanceNotRegistered);
});
