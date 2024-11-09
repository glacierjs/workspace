import { Component, Scope } from '@glacier/ioc';

import { AbstractController } from '../entities/AbstractController';
import type { ControllerMeta } from '../interfaces/ControllerMeta';
import { CONTROLLER_META } from '../reflection/CONTROLLER_META';

export function Controller(meta: ControllerMeta = {}): ClassDecorator {
  return (target) => {
    Component({ implements: [AbstractController], scope: Scope.SINGLETON })(
      target
    );
    CONTROLLER_META.set(meta, target);
  };
}
