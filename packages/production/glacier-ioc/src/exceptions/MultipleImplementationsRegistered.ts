import type { AnyConstructor } from '@glacier/types';

export class MultipleImplementationsRegistered extends Error {
  public constructor(target: AnyConstructor) {
    super(
      `More then one implementation has been registered for ${target.name}.`
    );
  }
}
