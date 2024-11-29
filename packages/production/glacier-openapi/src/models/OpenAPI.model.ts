import { ArrayProperty, ObjectProperty, RecordProperty, StringProperty } from '@glacier/schema';

import { ComponentsModel } from './Components.model';
import { ExternalDocumentationModel } from './ExternalDocumentation.model';
import { InfoModel } from './Info.model';
import { PathItemModel } from './PathItem.model';
import { ServerModel } from './Server.model';
import { TagModel } from './Tag.model';

export class OpenAPIModel {
  @StringProperty()
  public declare openapi: string;

  @ObjectProperty(InfoModel)
  public declare info: InfoModel;

  @StringProperty({ isOptional: true })
  public declare jsonSchemaDialect?: string;

  @ArrayProperty({ type: 'object', schema: ServerModel }, { isOptional: true })
  public declare servers?: ServerModel[];

  @RecordProperty({
    key: { type: 'string' },
    value: { type: 'object', schema: PathItemModel },
    isOptional: true
  })
  public declare paths?: Record<string, PathItemModel>;

  @ArrayProperty({ type: 'object', schema: TagModel }, { isOptional: true })
  public declare tags?: TagModel[];

  @ObjectProperty(ExternalDocumentationModel, true)
  public declare externalDocs?: ExternalDocumentationModel;

  @RecordProperty({
    key: { type: 'string' },
    value: { type: 'array', items: { type: 'string' } },
    isOptional: true
  })
  public declare security?: Record<string, string[]>;

  @ObjectProperty(ComponentsModel, true)
  public components?: ComponentsModel;

  @RecordProperty({
    key: { type: 'string' },
    value: { type: 'object', schema: PathItemModel },
    isOptional: true
  })
  public webhooks?: Record<string, PathItemModel>;
}
