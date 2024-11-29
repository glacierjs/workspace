import { ObjectProperty, StringProperty } from '@glacier/schema';

import { ContactModel } from './Contact.model';
import { LicenseModel } from './License.model';

export class InfoModel {
  @StringProperty()
  public declare title: string;

  @StringProperty()
  public declare version: string;

  @StringProperty({ isOptional: true })
  public declare summary?: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @StringProperty({ isOptional: true })
  public declare termsOfService?: string;

  @ObjectProperty(ContactModel, true)
  public declare contact?: ContactModel;

  @ObjectProperty(LicenseModel, true)
  public declare license?: LicenseModel;
}
