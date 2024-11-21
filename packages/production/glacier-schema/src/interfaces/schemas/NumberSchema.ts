import type { BaseSchema } from './BaseSchema';

export interface NumberSchema extends BaseSchema {
  type: 'number';
  multipleOf?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
}
