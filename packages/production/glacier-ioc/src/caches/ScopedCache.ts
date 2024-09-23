import type { AsyncLocalStorage } from 'node:async_hooks';

import type { InstanceCache } from '../interfaces/InstanceCache';
import type { InstanceFactory } from '../interfaces/InstanceFactory';

export class ScopedCache<T> implements InstanceCache<T> {
  private readonly factory: InstanceFactory<T>;
  private static readonly NO_SCOPE = Symbol();
  private readonly store: AsyncLocalStorage<symbol>;
  private readonly instances = new WeakMap<symbol, T>();

  public constructor(
    store: AsyncLocalStorage<symbol>,
    factory: InstanceFactory<T>
  ) {
    this.factory = factory;
    this.store = store;
  }

  public getInstance(): T {
    const scope = this.store.getStore() ?? ScopedCache.NO_SCOPE;
    const instance = this.instances.get(scope);
    if (instance) {
      return instance;
    }
    const newInstance = this.factory.create();
    this.instances.set(scope, newInstance);
    return newInstance;
  }
}
