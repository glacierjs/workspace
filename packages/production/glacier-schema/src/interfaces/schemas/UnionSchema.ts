import type { BaseSchema } from './BaseSchema';
import type { ObjectSchema } from './ObjectSchema';

export interface UnionSchema extends BaseSchema {
  type: 'union';
  property: string;
  items: ObjectSchema[];
}
