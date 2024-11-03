import { Constructor } from '@glacier/types';

export class MissingComponentDecorator extends Error {
  public constructor(cls: Constructor) {
    super(`Expected class ${cls.name} to be decorated with @Component or @Module.`);
  }
}