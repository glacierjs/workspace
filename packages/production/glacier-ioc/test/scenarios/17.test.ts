import { Factory } from '../../src/decorators/Factory';
import { Module } from '../../src/decorators/Module';
import { DIContainer } from '../../src/DIContainer';

it('should throw an error if factory returns primitive value', () => {

  @Module()
  class M {

    @Factory()
    public createA(): string {
      return '';
    }
  }

  const container = new DIContainer();
  expect(() => {
    container.register(M, M);
  }).toThrow();
});
