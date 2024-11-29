import { UnknownProperty } from '@glacier/schema';

import { BaseSchemaModel } from './BaseSchema.model';

export class UnknownSchemaModel extends BaseSchemaModel {
  @UnknownProperty(true)
  public declare default?: unknown;
}
