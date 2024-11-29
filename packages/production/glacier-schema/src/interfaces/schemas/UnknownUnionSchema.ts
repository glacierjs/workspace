import type { BaseSchema } from './BaseSchema';
import type { Schema } from '../Schema';

export interface UnknownUnionSchema extends BaseSchema {
  type: 'union';
  property?: never;
  items: Schema[];
}
