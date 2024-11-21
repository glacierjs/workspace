import type { BaseSchema } from './BaseSchema';

export interface LiteralSchema extends BaseSchema {
  type: 'literal';
  value: string | number | boolean;
}
