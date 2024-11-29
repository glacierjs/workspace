import {
  ArrayProperty,
  IntegerProperty,
  LiteralProperty,
  ObjectProperty,
  RecordProperty,
  UnionProperty,
  UnknownProperty
} from '@glacier/schema';

import { BaseSchemaModel } from './BaseSchema.model';
import { DiscriminatorModel } from './Discriminator.model';
import { schemaModel, SchemaModel } from './Schema.model';

export class ObjectSchemaModel extends BaseSchemaModel {
  @LiteralProperty('object')
  public declare type?: 'object';

  @ObjectProperty(DiscriminatorModel, true)
  public declare discriminator?: DiscriminatorModel;

  @IntegerProperty({ isOptional: true })
  public declare maxProperties?: number;

  @IntegerProperty({ isOptional: true })
  public declare minProperties?: number;

  @ArrayProperty({ type: 'string' }, { isOptional: true, uniqueItems: true })
  public declare required?: string[];

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'cyclic', factory: () => schemaModel }
  })
  public declare properties?: Record<string, SchemaModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'cyclic', factory: () => schemaModel }
  })
  public declare patternProperties?: Record<string, SchemaModel>;

  @UnionProperty({
    items: [
      { type: 'cyclic', factory: () => schemaModel },
      { type: 'literal', value: false }
    ]
  })
  public declare additionalProperties?: SchemaModel | false;

  @UnknownProperty(true)
  public declare default?: object;
}
