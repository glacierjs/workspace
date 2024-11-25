import { BooleanProperty, LiteralProperty } from '@glacier/schema';

import { BaseParameterModel } from './BaseParameter.model';

export class QueryParameterModel extends BaseParameterModel {
  @LiteralProperty('query')
  public declare in: 'query';

  @BooleanProperty(true)
  public declare allowReserved?: boolean;

  @BooleanProperty(true)
  public declare allowEmptyValue?: boolean;

  @BooleanProperty(true)
  public declare required?: boolean;
}
