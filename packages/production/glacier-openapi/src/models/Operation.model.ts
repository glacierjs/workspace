import {
  ArrayProperty,
  BooleanProperty,
  ObjectProperty,
  RecordProperty,
  StringProperty
} from '@glacier/schema';

import { CookieParameterModel } from './CookieParameter.model';
import { ExternalDocumentationModel } from './ExternalDocumentation.model';
import { HeaderParameterModel } from './HeaderParameter.model';
import { ParameterModel } from './Parameter.model';
import { PathItemModel } from './PathItem.model';
import { PathParameterModel } from './PathParameter.model';
import { QueryParameterModel } from './QueryParameter.model';
import { RequestBodyModel } from './RequestBody.model';
import { ResponseModel } from './Response.model';
import { ServerModel } from './Server.model';

export class OperationModel {
  @ArrayProperty({ type: 'string' }, { isOptional: true })
  public declare tags?: string[];

  @StringProperty({ isOptional: true })
  public declare summary?: string;

  @StringProperty({ isOptional: true })
  public declare operationId?: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @ObjectProperty(ExternalDocumentationModel, true)
  public declare externalDocs?: ExternalDocumentationModel;

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

  @ObjectProperty(RequestBodyModel, true)
  public declare requestBody?: RequestBodyModel;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string', pattern: /^(default|\d{3})$/ },
    value: { type: 'object', schema: ResponseModel }
  })
  public declare responses?: Record<string, ResponseModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: {
      type: 'record',
      key: { type: 'string' },
      value: { type: 'object', schema: PathItemModel }
    }
  })
  public declare callbacks?: Record<string, Record<string, PathItemModel>>;

  @BooleanProperty(true)
  public declare deprecated?: boolean;

  @RecordProperty({
    key: { type: 'string' },
    value: { type: 'array', items: { type: 'string' } },
    isOptional: true
  })
  public declare security?: Record<string, string[]>;

  @ArrayProperty({ type: 'object', schema: ServerModel }, { isOptional: true })
  public declare servers?: ServerModel[];
}
