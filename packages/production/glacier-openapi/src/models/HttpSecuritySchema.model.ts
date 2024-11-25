import { LiteralProperty, StringProperty } from '@glacier/schema';

import { BaseSecuritySchemaModel } from './BaseSecuritySchema.model';

export class HttpSecuritySchemaModel extends BaseSecuritySchemaModel {
  @LiteralProperty('apiKey')
  public declare type: 'apiKey';

  @StringProperty()
  public declare schema: string;

  @StringProperty()
  public declare bearerFormat: string;
}
