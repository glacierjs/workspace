import { RecordProperty } from '@glacier/schema';

import { ApiKeySecuritySchemaModel } from './ApiKeySecuritySchema.model';
import { CookieParameterModel } from './CookieParameter.model';
import { ExampleModel } from './Example.model';
import { HeaderModel } from './Header.model';
import { HeaderParameterModel } from './HeaderParameter.model';
import { HttpSecuritySchemaModel } from './HttpSecuritySchema.model';
import { LinkModel } from './Link.model';
import { MutualTLSSecuritySchemaModel } from './MutualTLSSecuritySchema.model';
import { Oauth2SecuritySchemaModel } from './Oauth2SecuritySchema.model';
import { OpenIdConnectSecuritySchemaModel } from './OpenIdConnectSecuritySchema.model';
import { ParameterModel } from './Parameter.model';
import { PathItemModel } from './PathItem.model';
import { PathParameterModel } from './PathParameter.model';
import { QueryParameterModel } from './QueryParameter.model';
import { RequestBodyModel } from './RequestBody.model';
import { ResponseModel } from './Response.model';
import { schemaModel, SchemaModel } from './Schema.model';
import { SecuritySchemaModel } from './SecuritySchema.model';

export class ComponentsModel {
  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: schemaModel
  })
  public declare schemas?: Record<string, SchemaModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: ResponseModel }
  })
  public declare responses?: Record<string, ResponseModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: {
      type: 'union',
      property: 'in',
      items: [
        { type: 'object', schema: QueryParameterModel },
        { type: 'object', schema: HeaderParameterModel },
        { type: 'object', schema: PathParameterModel },
        { type: 'object', schema: CookieParameterModel }
      ]
    }
  })
  public declare parameters?: Record<string, ParameterModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: ExampleModel }
  })
  public declare examples?: Record<string, ExampleModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: RequestBodyModel }
  })
  public declare requestBodies?: Record<string, RequestBodyModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: HeaderModel }
  })
  public declare headers?: Record<string, HeaderModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: {
      type: 'union',
      property: 'type',
      items: [
        { type: 'object', schema: ApiKeySecuritySchemaModel },
        { type: 'object', schema: HttpSecuritySchemaModel },
        { type: 'object', schema: MutualTLSSecuritySchemaModel },
        { type: 'object', schema: Oauth2SecuritySchemaModel },
        { type: 'object', schema: OpenIdConnectSecuritySchemaModel }
      ]
    }
  })
  public declare securitySchemes?: Record<string, SecuritySchemaModel>;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: LinkModel }
  })
  public declare links?: Record<string, LinkModel>;

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

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'object', schema: PathItemModel }
  })
  public declare pathItems?: Record<string, PathItemModel>;
}
