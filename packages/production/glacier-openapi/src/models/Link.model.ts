import { ObjectProperty, RecordProperty, StringProperty } from '@glacier/schema';

import { ServerModel } from './Server.model';

export class LinkModel {
  @StringProperty({ isOptional: true })
  public declare operationRef?: string;

  @StringProperty({ isOptional: true })
  public declare operationId?: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @ObjectProperty(ServerModel, true)
  public declare server?: ServerModel;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'string' }
  })
  public declare parameters?: Record<string, string>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'string' }
  })
  public declare requestBody?: Record<string, string>;
}
