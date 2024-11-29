import { ArrayProperty, IntegerProperty, LiteralProperty, StringProperty } from '@glacier/schema';

import { BaseSchemaModel } from './BaseSchema.model';

export class StringSchemaModel extends BaseSchemaModel {
  @LiteralProperty('string')
  public declare type: 'string';

  @IntegerProperty({ isOptional: true })
  public declare minLength?: number;

  @IntegerProperty({ isOptional: true })
  public declare maxLength?: number;

  @StringProperty({ isOptional: true })
  public declare pattern?: string;

  @StringProperty({ isOptional: true })
  public declare format?: string;

  @ArrayProperty({ type: 'string' }, { isOptional: true, uniqueItems: true })
  public declare enum?: string[];

  @ArrayProperty({ type: 'string' }, { isOptional: true, uniqueItems: true })
  public declare 'x-extensible-enum'?: string[];

  @StringProperty({ isOptional: true })
  public declare default?: string;
}
