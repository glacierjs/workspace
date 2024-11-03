import type { AbstractConstructor } from '@glacier/types';

export interface ConstructorParamMeta {
  target: AbstractConstructor;
  isArray: boolean;
  isOptional: boolean;
}
