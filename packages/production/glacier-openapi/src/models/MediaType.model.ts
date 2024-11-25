import { ObjectProperty, RecordProperty, StringProperty } from '@glacier/schema';

import { EncodingModel } from './Encoding.model';
import { ExampleModel } from './Example.model';
import { SchemaModel } from './Schema.model';

export class MediaTypeModel {
  @ObjectProperty(SchemaModel, true)
  public declare schema?: SchemaModel;

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
    value: { type: 'object', schema: EncodingModel }
  })
  public declare encoding?: Record<string, EncodingModel>;
}
