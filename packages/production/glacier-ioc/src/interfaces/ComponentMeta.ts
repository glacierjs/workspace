import type { Scope } from './Scope';
import { AbstractConstructor } from '@glacier/types';

export interface ComponentMeta {
  scope?: Scope;
  implements?: AbstractConstructor[];
}
