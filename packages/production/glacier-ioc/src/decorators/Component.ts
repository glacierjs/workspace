import type { ComponentMeta } from '../interfaces/ComponentMeta';
import { IOC_COMPONENT_META } from '../reflection/IOC_COMPONENT_META';
import { IOC_COMPONENT } from '../reflection/IOC_COMPONENT';

export function Component(meta: ComponentMeta = {}): ClassDecorator {
  return (target) => {
    IOC_COMPONENT.set(true, target);
    IOC_COMPONENT_META.set(meta, target);
  };
}
