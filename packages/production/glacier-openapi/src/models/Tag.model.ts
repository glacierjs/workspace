import { ObjectProperty, StringProperty } from '@glacier/schema';

import { ExternalDocumentationModel } from './ExternalDocumentation.model';

export class TagModel {
  @StringProperty()
  public declare name: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @ObjectProperty(ExternalDocumentationModel, true)
  public declare externalDocs?: ExternalDocumentationModel;
}
