import { BooleanProperty, RecordProperty, StringProperty } from '@glacier/schema';

import { HeaderModel } from './Header.model';

export class EncodingModel {
  @StringProperty({ isOptional: true })
  public declare contentType?: string;

  @StringProperty({ isOptional: true })
  public declare style?: string;

  @BooleanProperty({ isOptional: true })
  public declare explode?: boolean;

  @BooleanProperty({ isOptional: true })
  public declare allowReserved?: boolean;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: HeaderModel }
  })
  public declare headers?: Record<string, HeaderModel>;
}
