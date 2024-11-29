import { ObjectProperty } from '@glacier/schema';

import { Oauth2AuthorizationCodeFlowModel } from './Oauth2AuthorizationCodeFlow.model';
import { Oauth2ClientCredentialsFlowModel } from './Oauth2ClientCredentialsFlow.model';
import { Oauth2ImplicitFlowModel } from './Oauth2ImplicitFlow.model';
import { Oauth2PasswordFlowModel } from './Oauth2PasswordFlow.model';

export class Oauth2FlowsModel {
  @ObjectProperty(Oauth2ImplicitFlowModel, true)
  public declare implicit?: Oauth2ImplicitFlowModel;

  @ObjectProperty(Oauth2PasswordFlowModel, true)
  public declare password?: Oauth2PasswordFlowModel;

  @ObjectProperty(Oauth2ClientCredentialsFlowModel, true)
  public declare clientCredentials?: Oauth2ClientCredentialsFlowModel;

  @ObjectProperty(Oauth2AuthorizationCodeFlowModel, true)
  public declare authorizationCode?: Oauth2AuthorizationCodeFlowModel;
}
