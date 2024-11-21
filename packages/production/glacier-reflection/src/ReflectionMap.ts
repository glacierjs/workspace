import type { Constructor, Optional } from '@glacier/utils';

import { Reflection } from './Reflection';

export class ReflectionMap<T> {
  private readonly reflection: Reflection<Map<string | number, T>>;

  public constructor(key: string) {
    this.reflection = new Reflection(key);
  }

  public set(key: string | number, value: T, target: object, propertyKey?: string | symbol): void {
    const map = this.reflection.get(target as Constructor, propertyKey) ?? new Map();
    map.set(key, value);
    this.reflection.set(map, target, propertyKey);
  }

  public get(
    key: string | number,
    target: Constructor,
    propertyKey?: string | symbol
  ): Optional<T> {
    const map = this.reflection.get(target, propertyKey);
    return map?.get(key);
  }

  public has(key: string | number, target: Constructor, propertyKey?: string | symbol): boolean {
    const map = this.reflection.get(target, propertyKey);
    if (map) {
      return map.has(key);
    }
    return false;
  }

  public delete(key: string | number, target: Constructor, propertyKey?: string | symbol): void {
    const map = this.reflection.get(target, propertyKey);
    if (map) {
      map.delete(key);
    }
  }
}
