import 'reflect-metadata';
import type { Constructor, Optional } from '@glacier/types';

export class Reflection<T> {
  private readonly key: string;

  public constructor(key: string) {
    this.key = key;
  }

  public set(value: T, target: object, propertyKey?: string | symbol): void {
    if (propertyKey === undefined) {
      Reflect.defineMetadata(this.key, value, target);
    } else {
      Reflect.defineMetadata(this.key, value, target.constructor, propertyKey);
    }
  }

  public get(target: Constructor | object, propertyKey?: string | symbol): Optional<T> {
    const constructor = this.getConstructor(target);
    if (propertyKey === undefined) {
      return Reflect.getMetadata(this.key, constructor);
    } else {
      return Reflect.getMetadata(this.key, constructor, propertyKey);
    }
  }

  public has(target: Constructor | object, propertyKey?: string | symbol): boolean {
    const constructor = this.getConstructor(target);
    if (propertyKey === undefined) {
      return Reflect.hasMetadata(this.key, constructor);
    } else {
      return Reflect.hasMetadata(this.key, constructor, propertyKey);
    }
  }

  public hasOwn(target: Constructor | object, propertyKey?: string | symbol): boolean {
    const constructor = this.getConstructor(target);
    if (propertyKey === undefined) {
      return Reflect.hasOwnMetadata(this.key, constructor);
    } else {
      return Reflect.hasOwnMetadata(this.key, constructor, propertyKey);
    }
  }

  public delete(target: Constructor | object, propertyKey?: string | symbol): boolean {
    const constructor = this.getConstructor(target);
    if (propertyKey === undefined) {
      return Reflect.deleteMetadata(this.key, constructor);
    } else {
      return Reflect.deleteMetadata(this.key, constructor, propertyKey);
    }
  }

  private getConstructor(target: object | Constructor): Constructor {
    if (typeof target === 'object') {
      return target.constructor as Constructor;
    }
    return target;
  }
}
