import type { BaseSchema } from './BaseSchema';

export interface EnumSchema extends BaseSchema {
  type: 'enum';
  items: Record<string, string>;
}
