import { RecordProperty, StringProperty } from '@glacier/schema';

import { HeaderModel } from './Header.model';
import { LinkModel } from './Link.model';
import { MediaTypeModel } from './MediaType.model';

export class ResponseModel {
  @StringProperty()
  public declare description: string;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: HeaderModel }
  })
  public declare headers?: Record<string, HeaderModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: MediaTypeModel }
  })
  public declare content?: Record<string, MediaTypeModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: LinkModel }
  })
  public declare links?: Record<string, LinkModel>;
}
