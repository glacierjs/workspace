import { LiteralProperty, StringProperty } from '@glacier/schema';

import { BaseSecuritySchemaModel } from './BaseSecuritySchema.model';

export class OpenIdConnectSecuritySchemaModel extends BaseSecuritySchemaModel {
  @LiteralProperty('openIdConnect')
  public declare type: 'openIdConnect';

  @StringProperty()
  public declare openIdConnectUrl: string;
}
