import type { UnionSchema } from '@glacier/schema';

import { ArraySchemaModel } from './ArraySchema.model';
import { BooleanSchemaModel } from './BooleanSchema.model';
import { IntegerSchemaModel } from './IntegerSchema.model';
import { NullSchemaModel } from './NullSchema.model';
import { NumberSchemaModel } from './NumberSchema.model';
import { ObjectSchemaModel } from './ObjectSchema.model';
import { StringSchemaModel } from './StringSchema.model';
import { UnknownSchemaModel } from './UnknownSchema.model';

export type SchemaModel =
  | ObjectSchemaModel
  | StringSchemaModel
  | IntegerSchemaModel
  | NumberSchemaModel
  | BooleanSchemaModel
  | ArraySchemaModel
  | NullSchemaModel
  | UnknownSchemaModel;

export const schemaModel: UnionSchema = {
  type: 'union',
  items: [
    { type: 'object', schema: ObjectSchemaModel },
    {
      type: 'union',
      property: 'type',
      items: [
        { type: 'object', schema: StringSchemaModel },
        { type: 'object', schema: IntegerSchemaModel },
        { type: 'object', schema: NumberSchemaModel },
        { type: 'object', schema: BooleanSchemaModel },
        { type: 'object', schema: ArraySchemaModel },
        { type: 'object', schema: NullSchemaModel }
      ]
    },
    { type: 'object', schema: UnknownSchemaModel }
  ]
};
