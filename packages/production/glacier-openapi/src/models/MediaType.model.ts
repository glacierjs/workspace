import { RecordProperty, UnionProperty, UnknownProperty } from '@glacier/schema';

import { EncodingModel } from './Encoding.model';
import { ExampleModel } from './Example.model';
import { schemaModel, SchemaModel } from './Schema.model';

export class MediaTypeModel {
  @UnionProperty({ ...schemaModel, isOptional: true })
  public declare schema?: SchemaModel;

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
    value: { type: 'object', schema: EncodingModel }
  })
  public declare encoding?: Record<string, EncodingModel>;
}
