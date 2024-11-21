import type { BaseSchema } from './BaseSchema';
import type { NumberSchema } from './NumberSchema';
import type { StringSchema } from './StringSchema';
import type { Schema } from '../Schema';

export interface RecordSchema extends BaseSchema {
  type: 'record';
  key: NumberSchema | StringSchema;
  value: Schema;
  minProperties?: number;
  maxProperties?: number;
}
