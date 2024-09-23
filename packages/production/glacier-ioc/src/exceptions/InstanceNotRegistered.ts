import type { Constructor } from '@glacier/types';

export class InstanceNotRegistered extends Error {
  public constructor(cls: Constructor) {
    super(`No class registered with a constructor called ${cls.name}.`);
  }
}
