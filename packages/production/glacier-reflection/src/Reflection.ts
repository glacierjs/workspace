import type { Constructor } from '@glacier/utils';

import { ReadonlyReflection } from './ReadonlyReflection';

export class Reflection<T> extends ReadonlyReflection<T> {
  public set(value: T, target: object, propertyKey?: string | symbol): void {
    // @ts-expect-error defineMetadata is wrongly typed
    Reflect.defineMetadata(this.key, value, target, propertyKey);
  }

  public delete(
    target: Constructor | object,
    propertyKey?: string | symbol
  ): boolean {
    // @ts-expect-error deleteMetadata is wrongly typed
    return Reflect.deleteMetadata(this.key, target, propertyKey);
  }
}
