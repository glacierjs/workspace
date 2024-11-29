import { RecordProperty, StringProperty } from '@glacier/schema';

import { ServerVariableModel } from './ServerVariable.model';

export class ServerModel {
  @StringProperty()
  public declare url: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @RecordProperty({
    key: { type: 'string' },
    value: { type: 'object', schema: ServerVariableModel },
    isOptional: true
  })
  public declare variables?: Record<string, ServerVariableModel>;
}
