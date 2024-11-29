import { StringProperty } from '@glacier/schema';

export class LicenseModel {
  @StringProperty()
  public declare name: string;

  @StringProperty({ isOptional: true })
  public declare identifier?: string;

  @StringProperty({ isOptional: true })
  public declare url?: string;
}
