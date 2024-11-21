import type { Constructor } from '@glacier/utils';

import type { BaseSchema } from './BaseSchema';

export interface ObjectSchema extends BaseSchema {
  type: 'object';
  schema: Constructor;
}
