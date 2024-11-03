import type { AbstractConstructor } from '@glacier/types';

export class InstanceNotRegistered extends Error {
  public constructor(cls: AbstractConstructor) {
    super(`No class registered with a constructor called ${cls.name}.`);
  }
}
