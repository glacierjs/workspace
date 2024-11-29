import {
  BooleanProperty,
  EnumProperty,
  RecordProperty,
  StringProperty,
  UnionProperty,
  UnknownProperty
} from '@glacier/schema';

import { ExampleModel } from './Example.model';
import { MediaTypeModel } from './MediaType.model';
import { PropertyStyleModel } from './PropertyStyle.model';
import { SchemaModel, schemaModel } from './Schema.model';

export class HeaderModel {
  @BooleanProperty(true)
  public declare required?: boolean;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @BooleanProperty(true)
  public declare deprecated?: boolean;

  @EnumProperty(PropertyStyleModel, true)
  public declare style?: `${PropertyStyleModel}`;

  @UnionProperty({ ...schemaModel, isOptional: true })
  public declare schema?: SchemaModel;

  @BooleanProperty(true)
  public declare explode?: boolean;

  @UnknownProperty(true)
  public declare example?: unknown;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: ExampleModel }
  })
  public declare examples?: Record<string, ExampleModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'cyclic', factory: () => ({ type: 'object', schema: MediaTypeModel }) }
  })
  public declare content?: Record<string, MediaTypeModel>;
}
