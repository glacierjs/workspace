import {
  ArrayProperty,
  BooleanProperty,
  CyclicProperty,
  IntegerProperty,
  LiteralProperty,
  UnionProperty
} from '@glacier/schema';

import { BaseSchemaModel } from './BaseSchema.model';
import { BooleanSchemaModel } from './BooleanSchema.model';
import { schemaModel, SchemaModel } from './Schema.model';

export class ArraySchemaModel extends BaseSchemaModel {
  @LiteralProperty('array')
  public declare type: 'array';

  @ArrayProperty(
    {
      type: 'cyclic',
      factory: () => schemaModel
    },
    { isOptional: true }
  )
  public declare prefixItems?: SchemaModel[];

  @UnionProperty({
    isOptional: true,
    items: [
      {
        type: 'cyclic',
        factory: () => schemaModel
      },
      { type: 'object', schema: BooleanSchemaModel }
    ]
  })
  public declare items?: SchemaModel | BooleanSchemaModel;

  @UnionProperty({
    isOptional: true,
    items: [
      {
        type: 'cyclic',
        factory: () => schemaModel
      },
      { type: 'object', schema: BooleanSchemaModel }
    ]
  })
  public declare unevaluatedItems?: SchemaModel | boolean;

  @CyclicProperty(() => schemaModel, true)
  public declare contains?: SchemaModel;

  @IntegerProperty({ isOptional: true })
  public declare minContains?: number;

  @IntegerProperty({ isOptional: true })
  public declare maxContains?: number;

  @IntegerProperty({ isOptional: true })
  public declare minItems?: number;

  @IntegerProperty({ isOptional: true })
  public declare maxItems?: number;

  @BooleanProperty(true)
  public declare uniqueItems?: boolean;

  @ArrayProperty({ type: 'unknown' }, { isOptional: true })
  public declare default?: unknown[];
}
