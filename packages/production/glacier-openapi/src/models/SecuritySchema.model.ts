import type { ApiKeySecuritySchemaModel } from './ApiKeySecuritySchema.model';
import type { HttpSecuritySchemaModel } from './HttpSecuritySchema.model';
import type { MutualTLSSecuritySchemaModel } from './MutualTLSSecuritySchema.model';
import type { Oauth2SecuritySchemaModel } from './Oauth2SecuritySchema.model';
import type { OpenIdConnectSecuritySchemaModel } from './OpenIdConnectSecuritySchema.model';

export type SecuritySchemaModel =
  | ApiKeySecuritySchemaModel
  | HttpSecuritySchemaModel
  | MutualTLSSecuritySchemaModel
  | Oauth2SecuritySchemaModel
  | OpenIdConnectSecuritySchemaModel;
