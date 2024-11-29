import { LiteralProperty } from '@glacier/schema';

import { BaseParameterModel } from './BaseParameter.model';

export class PathParameterModel extends BaseParameterModel {
  @LiteralProperty('path')
  public declare in: 'path';

  @LiteralProperty(true)
  public declare required: true;
}
