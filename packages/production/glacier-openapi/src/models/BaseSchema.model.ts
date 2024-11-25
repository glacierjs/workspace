import { ObjectProperty } from '@glacier/schema';

import { ExternalDocumentationModel } from './ExternalDocumentation.model';

export class BaseSchemaModel {
  @ObjectProperty(ExternalDocumentationModel, true)
  public declare externalDocs?: ExternalDocumentationModel;
}
