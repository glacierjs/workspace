import type { BaseSchema } from './BaseSchema';
import type { ResolvedSchema } from '../ResolvedSchema';

export interface CyclicSchema extends BaseSchema {
  type: 'cyclic';
  factory: () => ResolvedSchema;
}
