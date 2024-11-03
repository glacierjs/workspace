import type { Constructor, Optional } from '@glacier/types';

export class ReadonlyReflection<T> {
  protected readonly key: string;

  public constructor(key: string) {
    this.key = key;
  }

  public get(target: Constructor | object, propertyKey?: string | symbol): Optional<T> {
    // @ts-ignore
    return Reflect.getMetadata(this.key, target, propertyKey);
  }

  public has(target: Constructor | object, propertyKey?: string | symbol): boolean {
    // @ts-ignore
    return Reflect.hasMetadata(this.key, target, propertyKey);
  }

  public hasOwn(target: Constructor | object, propertyKey?: string | symbol): boolean {
    // @ts-ignore
    return Reflect.hasOwnMetadata(this.key, target, propertyKey);
  }
}
