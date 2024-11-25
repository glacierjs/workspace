import { StringProperty } from '@glacier/schema';

export class ContactModel {
  @StringProperty({ isOptional: true })
  public declare name?: string;

  @StringProperty({ isOptional: true })
  public declare url?: string;

  @StringProperty({ isOptional: true })
  public declare email?: string;
}
