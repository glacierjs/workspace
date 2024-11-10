import type { Constructor } from '@glacier/utils';

import type { DIContainer } from '../DIContainer';
import type { InstanceFactory } from '../interfaces/InstanceFactory';

export class CustomFactory<T> implements InstanceFactory<T> {
  private readonly container: DIContainer;
  private readonly cls: Constructor;
  private readonly method: string;

  public constructor(container: DIContainer, cls: Constructor, method: string) {
    this.container = container;
    this.cls = cls;
    this.method = method;
  }

  public create(): T {
    const instance = this.container.resolveOrThrow<any>(this.cls);
    return instance[this.method](this.container) as T;
  }
}
