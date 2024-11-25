import { RecordProperty, StringProperty } from '@glacier/schema';

import { ObjectSchemaModel } from './ObjectSchema.model';

export class DiscriminatorModel {
  @StringProperty()
  public declare propertyName: string;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: ObjectSchemaModel }
  })
  public declare mapping?: Record<string, ObjectSchemaModel>;
}
