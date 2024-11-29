import { LiteralProperty, ObjectProperty } from '@glacier/schema';

import { BaseSecuritySchemaModel } from './BaseSecuritySchema.model';
import { Oauth2FlowsModel } from './Oauth2Flows.model';

export class Oauth2SecuritySchemaModel extends BaseSecuritySchemaModel {
  @LiteralProperty('oauth2')
  public declare type: 'oauth2';

  @ObjectProperty(Oauth2FlowsModel)
  public declare flows: Oauth2FlowsModel;
}
