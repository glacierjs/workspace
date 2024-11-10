import type { Constructor, Optional } from '@glacier/utils';

export class ReadonlyReflection<T> {
  protected readonly key: string;

  public constructor(key: string) {
    this.key = key;
  }

  public get(
    target: Constructor | object,
    propertyKey?: string | symbol
  ): Optional<T> {
    // @ts-expect-error getMetadata is wrongly typed
    return Reflect.getMetadata(this.key, target, propertyKey);
  }

  public has(
    target: Constructor | object,
    propertyKey?: string | symbol
  ): boolean {
    // @ts-expect-error hasMetadata is wrongly typed
    return Reflect.hasMetadata(this.key, target, propertyKey);
  }
}
