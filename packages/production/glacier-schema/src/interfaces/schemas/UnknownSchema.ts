import type { BaseSchema } from './BaseSchema';

export interface UnknownSchema extends BaseSchema {
  type: 'unknown';
}
