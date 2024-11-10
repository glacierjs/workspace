import 'reflect-metadata';
import type { Constructor } from '@glacier/utils';

import { ReadonlyReflection } from './ReadonlyReflection';

export class Reflection<T> extends ReadonlyReflection<T> {
  public set(value: T, target: object, propertyKey?: string | symbol): void {
    // @ts-ignore
    Reflect.defineMetadata(this.key, value, target, propertyKey);
  }

  public delete(
    target: Constructor | object,
    propertyKey?: string | symbol
  ): boolean {
    // @ts-ignore
    return Reflect.deleteMetadata(this.key, target, propertyKey);
  }
}
