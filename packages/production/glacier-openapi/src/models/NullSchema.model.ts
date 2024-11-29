import { LiteralProperty } from '@glacier/schema';

import { BaseSchemaModel } from './BaseSchema.model';

export class NullSchemaModel extends BaseSchemaModel {
  @LiteralProperty('null')
  public declare type: 'null';
}
