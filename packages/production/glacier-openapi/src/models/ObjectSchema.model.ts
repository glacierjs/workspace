import { LiteralProperty, ObjectProperty, RecordProperty, UnionProperty } from '@glacier/schema';

import { BaseSchemaModel } from './BaseSchema.model';
import { DiscriminatorModel } from './Discriminator.model';
import { SchemaModel } from './Schema.model';

export class ObjectSchemaModel extends BaseSchemaModel {
  @LiteralProperty('object')
  public declare type: 'object';

  @ObjectProperty(DiscriminatorModel, true)
  public declare discriminator?: DiscriminatorModel;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: SchemaModel }
  })
  public declare properties?: Record<string, SchemaModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: SchemaModel }
  })
  public declare patternProperties?: Record<string, SchemaModel>;

  @UnionProperty({
    items: [
      { type: 'object', schema: SchemaModel },
      { type: 'literal', value: false }
    ]
  })
  public declare additionalProperties?: SchemaModel | false;
}
