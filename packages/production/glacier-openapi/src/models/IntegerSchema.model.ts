import { BooleanProperty, EnumProperty, IntegerProperty, LiteralProperty } from '@glacier/schema';

import { BaseSchemaModel } from './BaseSchema.model';
import { IntegerFormatEnum } from './IntegerFormatEnum';

export class IntegerSchemaModel extends BaseSchemaModel {
  @LiteralProperty('integer')
  public declare type: 'integer';

  @IntegerProperty({ isOptional: true })
  public declare multipleOf?: number;

  @IntegerProperty({ isOptional: true })
  public declare minimum?: number;

  @IntegerProperty({ isOptional: true })
  public declare maximum?: number;

  @BooleanProperty(true)
  public declare exclusiveMinimum?: boolean;

  @BooleanProperty(true)
  public declare exclusiveMaximum?: boolean;

  @EnumProperty(IntegerFormatEnum, true)
  public declare format?: `${IntegerFormatEnum}`;

  @IntegerProperty({ isOptional: true })
  public declare default?: number;
}
