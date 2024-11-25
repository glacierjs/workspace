import { StringProperty } from '@glacier/schema';

import { Oauth2BaseFlow } from './Oauth2BaseFlow';

export class Oauth2ImplicitFlowModel extends Oauth2BaseFlow {
  @StringProperty()
  public declare authorizationUrl: string;
}
