import { BooleanProperty, LiteralProperty } from '@glacier/schema';

import { BaseParameterModel } from './BaseParameter.model';

export class CookieParameterModel extends BaseParameterModel {
  @LiteralProperty('cookie')
  public declare in: 'cookie';

  @BooleanProperty(true)
  public declare required?: boolean;
}
