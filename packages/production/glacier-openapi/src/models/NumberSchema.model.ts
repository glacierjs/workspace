import {
  BooleanProperty,
  EnumProperty,
  IntegerProperty,
  LiteralProperty,
  NumberProperty
} from '@glacier/schema';

import { BaseSchemaModel } from './BaseSchema.model';
import { NumberFormatEnum } from './NumberFormatEnum';

export class NumberSchemaModel extends BaseSchemaModel {
  @LiteralProperty('number')
  public declare type: 'number';

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

  @EnumProperty(NumberFormatEnum, true)
  public declare format?: `${NumberFormatEnum}`;

  @NumberProperty({ isOptional: true })
  public declare default?: number;
}
