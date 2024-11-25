import {
  BooleanProperty,
  EnumProperty,
  ObjectProperty,
  RecordProperty,
  StringProperty
} from '@glacier/schema';

import { ExampleModel } from './Example.model';
import { MediaTypeModel } from './MediaType.model';
import { PropertyStyleModel } from './PropertyStyle.model';
import { SchemaModel } from './Schema.model';

export class BaseParameterModel {
  @StringProperty()
  public declare name: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @BooleanProperty(true)
  public declare deprecated?: boolean;

  @EnumProperty(PropertyStyleModel, true)
  public declare style?: PropertyStyleModel;

  @ObjectProperty(SchemaModel, true)
  public declare schema?: SchemaModel;

  @BooleanProperty(true)
  public declare explode?: boolean;

  @StringProperty({ isOptional: true })
  public declare example?: string;

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
