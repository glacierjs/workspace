import type { Oauth2AuthorizationCodeFlowModel } from './Oauth2AuthorizationCodeFlow.model';
import type { Oauth2ClientCredentialsFlowModel } from './Oauth2ClientCredentialsFlow.model';
import type { Oauth2ImplicitFlowModel } from './Oauth2ImplicitFlow.model';
import type { Oauth2PasswordFlowModel } from './Oauth2PasswordFlow.model';

export type Oauth2FlowModel =
  | Oauth2ImplicitFlowModel
  | Oauth2PasswordFlowModel
  | Oauth2AuthorizationCodeFlowModel
  | Oauth2ClientCredentialsFlowModel;
