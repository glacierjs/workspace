import type { Constructor, Optional } from '@glacier/types';

export class ReadonlyReflection<T> {
  protected readonly key: string;

  public constructor(key: string) {
    this.key = key;
  }

  public get(target: Constructor | object, propertyKey?: string | symbol): Optional<T> {
    const constructor = this.getConstructor(target);
    // @ts-ignore
    return Reflect.getMetadata(this.key, constructor, propertyKey);
  }

  public has(target: Constructor | object, propertyKey?: string | symbol): boolean {
    const constructor = this.getConstructor(target);
    // @ts-ignore
    return Reflect.hasMetadata(this.key, constructor, propertyKey);
  }

  public hasOwn(target: Constructor | object, propertyKey?: string | symbol): boolean {
    const constructor = this.getConstructor(target);
    // @ts-ignore
    return Reflect.hasOwnMetadata(this.key, constructor, propertyKey);
  }


  protected getConstructor(target: object | Constructor): Constructor {
    if (typeof target === 'object') {
      return target.constructor as Constructor;
    }
    return target;
  }
}
