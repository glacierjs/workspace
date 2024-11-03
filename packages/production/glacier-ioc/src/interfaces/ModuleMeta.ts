import type { Constructor } from '@glacier/types';
import { ComponentMeta } from './ComponentMeta';

export interface ModuleMeta extends Omit<ComponentMeta, 'scope'> {
  imports?: Constructor[];
}
