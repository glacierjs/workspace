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
      Reflect.defineMetadata(this.key, value, target, propertyKey);
    }
  }

  public get(target: Constructor, propertyKey?: string | symbol): Optional<T> {
    if (propertyKey === undefined) {
      return Reflect.getMetadata(this.key, target);
    } else {
      return Reflect.getMetadata(this.key, target.prototype, propertyKey);
    }
  }

  public has(target: Constructor, propertyKey?: string | symbol): boolean {
    if (propertyKey === undefined) {
      return Reflect.hasMetadata(this.key, target);
    } else {
      return Reflect.hasMetadata(this.key, target.prototype, propertyKey);
    }
  }

  public hasOwn(target: Constructor, propertyKey?: string | symbol): boolean {
    if (propertyKey === undefined) {
      return Reflect.hasOwnMetadata(this.key, target);
    } else {
      return Reflect.hasOwnMetadata(this.key, target.prototype, propertyKey);
    }
  }

  public delete(target: Constructor, propertyKey?: string | symbol): boolean {
    if (propertyKey === undefined) {
      return Reflect.deleteMetadata(this.key, target);
    } else {
      return Reflect.deleteMetadata(this.key, target.prototype, propertyKey);
    }
  }
}
