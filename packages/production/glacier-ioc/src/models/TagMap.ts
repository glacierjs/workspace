import type { Constructor } from '@glacier/types';

import { TagNotRegistered } from '../exceptions/TagNotRegistered';

export class TagMap {
  private readonly map = new WeakMap<symbol, Set<Constructor>>();

  public addClass(tag: symbol, cls: Constructor): this {
    const clsSet = this.map.get(tag) ?? new Set();
    clsSet.add(cls);
    this.map.set(tag, clsSet);
    return this;
  }

  public getClasses<T>(tag: symbol): Constructor<T>[] {
    const clsSet = this.map.get(tag);
    if (!clsSet) {
      throw new TagNotRegistered(tag);
    }
    return [...clsSet.values()] as Constructor<T>[];
  }
}
