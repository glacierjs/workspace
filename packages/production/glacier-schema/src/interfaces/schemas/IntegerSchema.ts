import type { BaseSchema } from './BaseSchema';

export interface IntegerSchema extends BaseSchema {
  type: 'integer';
  multipleOf?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
}
