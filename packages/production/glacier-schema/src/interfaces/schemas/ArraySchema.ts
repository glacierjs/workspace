import type { BaseSchema } from './BaseSchema';
import type { Schema } from '../Schema';

export interface ArraySchema extends BaseSchema {
  type: 'array';
  items: Schema;
  uniqueItems?: boolean;
  minItems?: number;
  maxItems?: number;
}
