import type { AbstractConstructor } from '@glacier/types';

import type { Scope } from './Scope';

export interface ComponentMeta {
  scope?: Scope;
  implements?: AbstractConstructor[];
}
