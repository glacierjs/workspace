import type { BaseSchema } from './BaseSchema';
import type { ObjectSchema } from './ObjectSchema';

export interface DiscriminatedUnionSchema extends BaseSchema {
  type: 'union';
  property: string;
  items: ObjectSchema[];
}
