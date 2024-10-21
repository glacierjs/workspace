import { Component, Scope } from '@glacier/ioc';
import { TAG_CONTROLLER } from '../constants/TAG_CONTROLLER';
import { ControllerMeta } from '../interfaces/ControllerMeta';
import { CONTROLLER_META } from '../reflection/CONTROLLER_META';

export function Controller(meta: ControllerMeta = {}): ClassDecorator {
  return (target) => {
    Component({ tags: [TAG_CONTROLLER], scope: Scope.SINGLETON })(target);
    CONTROLLER_META.set(meta, target);
  };
}
