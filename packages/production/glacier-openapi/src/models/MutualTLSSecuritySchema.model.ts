import { LiteralProperty } from '@glacier/schema';

import { BaseSecuritySchemaModel } from './BaseSecuritySchema.model';

export class MutualTLSSecuritySchemaModel extends BaseSecuritySchemaModel {
  @LiteralProperty('mutualTLS')
  public declare type: 'mutualTLS';
}
