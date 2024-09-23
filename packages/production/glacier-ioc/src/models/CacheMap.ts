import type { Constructor } from '@glacier/types';

import { InstanceNotRegistered } from '../exceptions/InstanceNotRegistered';
import type { InstanceCache } from '../interfaces/InstanceCache';

export class CacheMap {
  private readonly map = new WeakMap<Constructor, InstanceCache<any>>();

  public addCache<T>(key: Constructor<T>, value: InstanceCache<T>): void {
    this.map.set(key, value);
  }

  public getInstance<T>(key: Constructor<T>): T {
    if (!this.map.has(key)) {
      throw new InstanceNotRegistered(key);
    }
    const cache = this.map.get(key) as InstanceCache<T>;
    return cache.getInstance();
  }
}
