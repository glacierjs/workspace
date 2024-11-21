import type { BaseSchema } from './BaseSchema';

export interface StringSchema extends BaseSchema {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}
