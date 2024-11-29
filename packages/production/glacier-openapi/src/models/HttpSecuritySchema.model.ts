import { LiteralProperty, StringProperty } from '@glacier/schema';

import { BaseSecuritySchemaModel } from './BaseSecuritySchema.model';

export class HttpSecuritySchemaModel extends BaseSecuritySchemaModel {
  @LiteralProperty('http')
  public declare type: 'http';

  @StringProperty()
  public declare scheme: string;

  @StringProperty()
  public declare bearerFormat: string;
}
