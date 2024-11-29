import { ArrayProperty, ObjectProperty, StringProperty } from '@glacier/schema';

import { CookieParameterModel } from './CookieParameter.model';
import { HeaderParameterModel } from './HeaderParameter.model';
import { OperationModel } from './Operation.model';
import { ParameterModel } from './Parameter.model';
import { PathParameterModel } from './PathParameter.model';
import { QueryParameterModel } from './QueryParameter.model';
import { ServerModel } from './Server.model';

export class PathItemModel {
  @StringProperty({ isOptional: true })
  public declare summary?: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @StringProperty({ isOptional: true })
  public declare $ref?: string;

  @ArrayProperty({ type: 'object', schema: ServerModel }, { isOptional: true })
  public declare servers?: ServerModel[];

  @ArrayProperty(
    {
      type: 'union',
      property: 'in',
      items: [
        { type: 'object', schema: QueryParameterModel },
        { type: 'object', schema: HeaderParameterModel },
        { type: 'object', schema: PathParameterModel },
        { type: 'object', schema: CookieParameterModel }
      ]
    },
    { isOptional: true }
  )
  public declare parameters?: ParameterModel[];

  @ObjectProperty(OperationModel, true)
  public declare get?: OperationModel;

  @ObjectProperty(OperationModel, true)
  public declare put?: OperationModel;

  @ObjectProperty(OperationModel, true)
  public declare post?: OperationModel;

  @ObjectProperty(OperationModel, true)
  public declare delete?: OperationModel;

  @ObjectProperty(OperationModel, true)
  public declare options?: OperationModel;

  @ObjectProperty(OperationModel, true)
  public declare head?: OperationModel;

  @ObjectProperty(OperationModel, true)
  public declare patch?: OperationModel;

  @ObjectProperty(OperationModel, true)
  public declare trace?: OperationModel;
}
