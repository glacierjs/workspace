import { BooleanProperty, RecordProperty, StringProperty } from '@glacier/schema';

import { MediaTypeModel } from './MediaType.model';

export class RequestBodyModel {
  @StringProperty({ isOptional: true })
  public declare description?: string;

  @BooleanProperty(true)
  public declare required?: boolean;

  @RecordProperty({
    key: { type: 'string' },
    value: { type: 'object', schema: MediaTypeModel }
  })
  public declare content: Record<string, MediaTypeModel>;
}
