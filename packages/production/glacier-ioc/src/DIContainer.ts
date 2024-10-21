import 'reflect-metadata';
import { DESIGN_RETURN_TYPE } from '@glacier/reflection';
import type { Constructor, Optional } from '@glacier/types';
import { getMethodNames } from '@glacier/utils';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

import { ScopedCache } from './caches/ScopedCache';
import { SingletonCache } from './caches/SingletonCache';
import { TransientCache } from './caches/TransientCache';
import { InvalidFactoryResult } from './exceptions/InvalidFactoryResult';
import { CustomFactory } from './factories/CustomFactory';
import { DefaultFactory } from './factories/DefaultFactory';
import type { ComponentMeta } from './interfaces/ComponentMeta';
import type { InstanceCache } from './interfaces/InstanceCache';
import type { InstanceFactory } from './interfaces/InstanceFactory';
import { Scope } from './interfaces/Scope';
import { CacheMap } from './models/CacheMap';
import { TagMap } from './models/TagMap';
import { IOC_COMPONENT_META } from './reflection/IOC_COMPONENT_META';
import { IOC_FACTORY } from './reflection/IOC_FACTORY';
import { IOC_FACTORY_META } from './reflection/IOC_FACTORY_META';
import { IOC_MODULE } from './reflection/IOC_MODULE';
import { IOC_MODULE_META } from './reflection/IOC_MODULE_META';
import { isConstructor } from './typeguards/isConstructor';

export class DIContainer {
  private cacheMap = new CacheMap();
  private tagMap = new TagMap();
  private static store = new AsyncLocalStorage<symbol>();

  public createScope<T>(callback: () => T): T {
    const scopeId = randomUUID();
    const scope = Symbol(scopeId);
    return DIContainer.store.run(scope, callback);
  }

  public register<T>(cls: Constructor<T>): void {
    const clsMeta = this.getClassMeta(cls);
    this.registerTagsFromMeta(cls, clsMeta);
    this.registerFactoryFromMeta(cls, clsMeta);
    this.registerModule(cls);
  }

  private registerModule<T>(cls: Constructor<T>) {
    const isMeta = IOC_MODULE.has(cls);

    if (!isMeta) {
      return;
    }

    const moduleMeta = IOC_MODULE_META.get(cls) ?? {};
    const methods = getMethodNames(cls);

    for (const method of methods) {
      const isFactory = IOC_FACTORY.has(cls, method);
      if (!isFactory) {
        continue;
      }
      this.registerFactory(cls, method);
    }

    const { imports } = moduleMeta;
    if (imports) {
      for (const importCls of imports) {
        this.register(importCls);
      }
    }
  }

  private registerFactory(cls: Constructor, method: string): void {
    const meta = IOC_FACTORY_META.get(cls, method);
    const returnValue = DESIGN_RETURN_TYPE.get(cls, method);

    if (!isConstructor(returnValue)) {
      throw new InvalidFactoryResult();
    }

    if (meta?.tags) {
      for (const tag of meta.tags) {
        this.registerTag(tag, returnValue);
      }
    }

    const factory = new CustomFactory(this, cls, method);
    const scope = meta?.scope ?? Scope.SINGLETON;
    const cache = this.getCacheForScope(scope, factory);
    this.cacheMap.addCache(returnValue, cache);
  }

  private registerFactoryFromMeta<T>(
    cls: Constructor<T>,
    clsMeta?: ComponentMeta
  ) {
    const factory = new DefaultFactory(this, cls);
    const scope = clsMeta?.scope ?? Scope.SINGLETON;
    const cache = this.getCacheForScope(scope, factory);
    this.cacheMap.addCache(cls, cache);
  }

  private getCacheForScope<T>(
    scope: Scope,
    factory: InstanceFactory<T>
  ): InstanceCache<T> {
    switch (scope) {
      case Scope.SINGLETON: {
        return new SingletonCache(factory);
      }
      case Scope.TRANSIENT: {
        return new TransientCache(factory);
      }
      case Scope.SCOPED: {
        return new ScopedCache(DIContainer.store, factory);
      }
    }
  }

  private registerTagsFromMeta<T>(
    cls: Constructor<T>,
    clsMeta?: ComponentMeta
  ): void {
    if (clsMeta?.tags) {
      for (const tag of clsMeta.tags) {
        this.tagMap.addClass(tag, cls);
      }
    }
  }

  public registerTag(tag: symbol, cls: Constructor): void {
    this.tagMap.addClass(tag, cls);
    this.register(cls);
  }

  public resolve<T>(cls: Constructor<T>): T {
    return this.cacheMap.getInstance(cls);
  }

  public resolveByTag<T = object>(tag: symbol): T[] {
    const classList = this.tagMap.getClasses(tag);
    return classList.map((cls) => this.resolve(cls) as T);
  }

  private getClassMeta(cls: Constructor): Optional<ComponentMeta> {
    return IOC_COMPONENT_META.get(cls);
  }
}
