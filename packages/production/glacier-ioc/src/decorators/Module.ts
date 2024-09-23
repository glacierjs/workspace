import { Component } from './Component';
import type { ModuleMeta } from '../interfaces/ModuleMeta';
import { Scope } from '../interfaces/Scope';
import { IOC_MODULE } from '../reflection/IOC_MODULE';
import { IOC_MODULE_META } from '../reflection/IOC_MODULE_META';

export function Module(meta: ModuleMeta = {}): ClassDecorator {
  return (target) => {
    Component({
      scope: Scope.SINGLETON
    })(target);
    IOC_MODULE.set(true, target);
    IOC_MODULE_META.set(meta, target);
  };
}
