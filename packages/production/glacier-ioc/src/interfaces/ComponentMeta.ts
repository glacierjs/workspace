import type { Scope } from './Scope';

export interface ComponentMeta {
  scope?: Scope;
  tags?: symbol[];
}
