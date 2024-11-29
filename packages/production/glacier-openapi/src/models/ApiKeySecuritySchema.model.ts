import { EnumProperty, LiteralProperty, StringProperty } from '@glacier/schema';

import { ApiKeyHeaderModel } from './ApiKeyHeader.model';
import { BaseSecuritySchemaModel } from './BaseSecuritySchema.model';

export class ApiKeySecuritySchemaModel extends BaseSecuritySchemaModel {
  @LiteralProperty('apiKey')
  public declare type: 'apiKey';

  @StringProperty()
  public declare name: string;

  @EnumProperty(ApiKeyHeaderModel)
  public declare in: `${ApiKeyHeaderModel}`;
}
