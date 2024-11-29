import { BooleanProperty, LiteralProperty } from '@glacier/schema';

import { BaseParameterModel } from './BaseParameter.model';

export class HeaderParameterModel extends BaseParameterModel {
  @LiteralProperty('header')
  public declare in: 'header';

  @BooleanProperty(true)
  public declare required?: boolean;
}
