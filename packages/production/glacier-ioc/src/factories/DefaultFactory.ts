import { DESIGN_PARAM_TYPES } from '@glacier/reflection';
import { Constructor, isConstructor } from '@glacier/types';

import type { DIContainer } from '../DIContainer';
import { UnresolvableParam } from '../exceptions/UnresolvableParam';
import type { InstanceFactory } from '../interfaces/InstanceFactory';
import { IOC_CONSTRUCTOR_PARAM } from '../reflection/IOC_CONSTRUCTOR_PARAM';

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
      const constructorParamMeta = IOC_CONSTRUCTOR_PARAM.get(index, cls);
      if (constructorParamMeta) {
        if (constructorParamMeta.isArray) {
          return this.container.resolveAll(constructorParamMeta.target);
        } else if (constructorParamMeta.isOptional) {
          return this.container.resolve(constructorParamMeta.target);
        } else {
          return this.container.resolveOrThrow(constructorParamMeta.target);
        }
      }
      if (!isConstructor(paramType)) {
        throw new UnresolvableParam(cls, paramType, index);
      }
      return this.container.resolveOrThrow(paramType);
    });
  }
}
