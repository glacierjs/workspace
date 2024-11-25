import { StringProperty } from '@glacier/schema';

export class ExternalDocumentationModel {
  @StringProperty()
  public declare url: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;
}
