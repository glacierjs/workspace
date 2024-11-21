import type { BaseSchema } from './BaseSchema';
import type { Schema } from '../Schema';

export interface TupleSchema extends BaseSchema {
  type: 'tuple';
  items: Schema[];
}
