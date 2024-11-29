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
import { schemaModel, SchemaModel } from './Schema.model';

export class BaseParameterModel {
  @StringProperty()
  public declare name: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @BooleanProperty(true)
  public declare deprecated?: boolean;

  @EnumProperty(PropertyStyleModel, true)
  public declare style?: PropertyStyleModel;

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
    value: { type: 'object', schema: MediaTypeModel }
  })
  public declare content?: Record<string, MediaTypeModel>;
}
