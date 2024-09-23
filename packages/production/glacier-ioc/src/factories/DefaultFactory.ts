import { DESIGN_PARAM_TYPES } from '@glacier/reflection';
import type { Constructor } from '@glacier/types';

import type { DIContainer } from '../DIContainer';
import { UnresolvableParam } from '../exceptions/UnresolvableParam';
import type { InstanceFactory } from '../interfaces/InstanceFactory';
import { IOC_CONSTRUCTOR_TAG } from '../reflection/IOC_CONSTRUCTOR_TAG';
import { isConstructor } from '../typeguards/isConstructor';

export class DefaultFactory<T> implements InstanceFactory<T> {
  private readonly container: DIContainer;
  private readonly cls: Constructor<T>;

  public constructor(container: DIContainer, cls: Constructor<T>) {
    this.container = container;
    this.cls = cls;
  }

  public create(): T {
    const Constructor = this.cls;
    const resolvedParams = this.resolveConstructor(Constructor);
    return new Constructor(...resolvedParams);
  }

  protected resolveConstructor(cls: Constructor<T>): unknown[] {
    const paramTypes = DESIGN_PARAM_TYPES.get(cls);
    if (paramTypes == undefined) {
      return [];
    }
    return paramTypes.map((paramType, index) => {
      const tag = IOC_CONSTRUCTOR_TAG.get(index, cls);
      if (tag) {
        return this.container.resolveByTag(tag);
      }
      if (!isConstructor(paramType)) {
        throw new UnresolvableParam(cls, paramType, index);
      }
      return this.container.resolve(paramType);
    });
  }
}
