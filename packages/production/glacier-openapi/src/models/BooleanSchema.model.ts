import { BooleanProperty, LiteralProperty } from '@glacier/schema';

import { BaseSchemaModel } from './BaseSchema.model';

export class BooleanSchemaModel extends BaseSchemaModel {
  @LiteralProperty('boolean')
  public declare type: 'boolean';

  @BooleanProperty(true)
  public declare default?: boolean;
}
